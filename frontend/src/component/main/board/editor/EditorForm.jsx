import Title from '../../title/Title.jsx';
import { useDispatch, useSelector } from 'react-redux';
import styles from './EditorForm.module.css';
import { useEffect, useRef, useState } from 'react';
import BoardTypeSelectButton from '../button/BoardTypeSelectButton.jsx';
import BoardButton from '../../../admin/navigation/button/board/BoardButton.jsx';
import { useNavigate } from 'react-router-dom';
import {
  createBoardPost,
  modifyBoardPost,
} from '../../../../redux/slices/board/boardThunk.js';
import SizedBox from '../../sizedBox/SizedBox.jsx';

const EditorForm = ({ boardRegion, modifyData }) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const id = useSelector((state) => state.auth.id);
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);

  const editorRef = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [selectedBoardType, setSelectedBoardType] = useState(
    modifyData ? modifyData.boardType : '일반',
  );
  const [postTitle, setPostTitle] = useState(
    modifyData ? modifyData.title : '',
  );

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleInsertImage = () => {
    const url = prompt('이미지 URL을 입력하세요:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const handleFontSize = (e) => {
    execCommand('fontSize', e.target.value);
  };

  const handleCancelButtonClick = () => {
    navigate(-1);
  };

  // 폼 유효성 검사를 수행하는 함수
  const validateForm = () => {
    // 오류 메시지를 저장할 객체를 초기화합니다.
    const errors = {
      id: '',
      content: '',
    };
    let isValid = true;

    // 아이디 입력값 검증
    if (!postTitle.trim()) {
      errors.id = '아이디를 입력해주세요.';
      isValid = false;
    }

    if (!editorRef.current.innerHTML.trim()) {
      errors.content = '게시물 내용을 입력해주세요..';
      isValid = false;
    }

    // 유효성 검사 결과를 반환합니다.
    return {
      isValid,
      errors,
    };
  };

  const handleSubmit = async () => {
    const { isValid, errors } = validateForm();

    if (!isValid) {
      // 유효하지 않은 경우 오류 메시지를 표시합니다.
      alert(`${errors.id} ${errors.content}`);
      return;
    }

    const editor = editorRef.current;
    const images = editor.getElementsByTagName('img');

    const formData = {
      title: postTitle,
      content: editorRef.current.innerHTML,
      boardType: selectedBoardType,
      member: { id: id },
      regionBoardName: boardRegion,
      ...(modifyData && { id: modifyData.id }),
    };

    if (images.length > 0) {
      const firstImage = images[0];
      formData.featuredImagePath = firstImage.src;
    }

    try {
      let response;
      if (modifyData) {
        response = await dispatch(
          modifyBoardPost({ formData, token }),
        ).unwrap();
      } else {
        response = await dispatch(
          createBoardPost({ formData, token }),
        ).unwrap();
      }
      navigate(`/board/${response.regionBoardId}`);
    } catch (err) {
      if (err === 'JWT_EXPIRED') {
        // JWT 만료 시 로그인 페이지로 리다이렉트
        alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
        navigate('/login');
      } else {
        // 기타 에러 처리
        alert(err);
      }
    }
  };

  useEffect(() => {
    if (modifyData && editorRef.current) {
      editorRef.current.innerHTML = modifyData.content;
    }
  }, [modifyData]);

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;

    await requestImages(files);
  };

  const requestImages = async (files) => {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const uploadResponse = await fetch('/api/board/imageUpload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('이미지 업로드에 실패했습니다.');
        }

        const imageUrl = await uploadResponse.text();

        insertImageAtCursor(baseURL + imageUrl);
      } catch (error) {
        console.error(error);
        alert('이미지 업로드 중 오류가 발생했습니다.');
      }
    }
  };

  const requestVideos = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadResponse = await fetch('/api/video/videoUpload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('동영상 업로드에 실패했습니다.');
      }

      const videoUrl = await uploadResponse.text();

      insertVideoAtCursor(baseURL + videoUrl);
    } catch (error) {
      console.error(error);
      alert('동영상 업로드 중 오류가 발생했습니다.');
    }
  };

  const requestAudios = async (file) => {
    // 오디오 업로드 처리
    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadResponse = await fetch('/api/audio/audioUpload', {
        // 오디오 업로드 엔드포인트
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('오디오 업로드에 실패했습니다.');
      }

      const audioUrl = await uploadResponse.text();

      insertAudioAtCursor(baseURL + audioUrl);
    } catch (error) {
      console.error(error);
      alert('오디오 업로드 중 오류가 발생했습니다.');
    }
  };

  const insertImageAtCursor = (imageUrl) => {
    const editor = editorRef.current;
    editor.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!range) return;

    // 이미지 요소 생성
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.display = 'block'; // 한 줄 전체를 차지하게 설정

    // Range에 이미지 삽입
    range.insertNode(img);

    // Range를 이미지 뒤로 이동
    range.setStartAfter(img);
    range.setEndAfter(img);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const insertVideoAtCursor = (videoUrl) => {
    const editor = editorRef.current;
    editor.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!range) return;

    // 비디오 요소 생성
    const video = document.createElement('video');
    video.src = videoUrl;
    video.controls = true;
    video.style.display = 'block'; // 한 줄 전체를 차지하게 설정
    video.style.maxWidth = '100%'; // 에디터 너비에 맞게 조절

    // Range에 비디오 삽입
    range.insertNode(video);

    // Range를 비디오 뒤로 이동
    range.setStartAfter(video);
    range.setEndAfter(video);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const insertAudioAtCursor = (audioUrl) => {
    // 오디오 삽입 함수
    const editor = editorRef.current;
    editor.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!range) return;

    const audio = document.createElement('audio');
    audio.src = audioUrl;
    audio.controls = true;
    audio.style.display = 'block';
    audio.style.maxWidth = '100%';

    range.insertNode(audio);

    range.setStartAfter(audio);
    range.setEndAfter(audio);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleImageButtonClick = (e) => {
    e.preventDefault();

    imageRef.current.click();
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;

    await requestImages(files);
  };

  const handleVideoButtonClick = (e) => {
    e.preventDefault();

    videoRef.current.click();
  };

  const handleVideoChange = async (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      await requestVideos(files[0]);
    }
  };

  const handleAudioButtonClick = (e) => {
    e.preventDefault();
    audioRef.current.click();
  };

  const handleAudioChange = async (e) => {
    // 오디오 파일 선택 핸들러
    const files = e.target.files;

    if (files.length > 0) {
      await requestAudios(files[0]);
    }
  };

  return (
    <>
      <Title titleText={`${boardRegion} 게시판`} />
      <div className={styles.id}>{id}</div>
      <div className={styles.boardType}>
        <div className={styles.boardTypeTitle}>말머리</div>
        {role === 'ADMIN' && (
          <BoardTypeSelectButton
            buttonText={'공지'}
            selectedBoardType={selectedBoardType}
            onClick={() => setSelectedBoardType('공지')}
          />
        )}
        <BoardTypeSelectButton
          buttonText={'일반'}
          selectedBoardType={selectedBoardType}
          onClick={() => setSelectedBoardType('일반')}
        />
      </div>
      <input
        type='text'
        placeholder={'제목을 입력하세요.'}
        onChange={(e) => setPostTitle(e.target.value)}
        value={postTitle}
        className={styles.titleInput}
      />
      <div className={styles.editorContainer} onDrop={handleDrop}>
        <div className={styles.toolbar}>
          <select
            onChange={handleFontSize}
            defaultValue=''
            className={styles.toolbarFontSize}
          >
            <option value='' disabled>
              폰트 크기
            </option>
            <option value='1'>작게</option>
            <option value='3'>보통</option>
            <option value='5'>크게</option>
            <option value='7'>매우 크게</option>
          </select>
          <button
            onClick={() => execCommand('bold')}
            className={styles.toolbarButton}
          >
            <b>가</b>
          </button>
          <button
            onClick={() => execCommand('italic')}
            className={styles.toolbarButton}
          >
            <i>i</i>
          </button>
          <button
            onClick={() => execCommand('underline')}
            className={styles.toolbarButton}
          >
            <u>가</u>
          </button>
          <button
            onClick={() => execCommand('strikeThrough')}
            className={styles.toolbarButton}
          >
            <s>가</s>
          </button>
          <input
            type='color'
            onChange={(e) => execCommand('foreColor', e.target.value)}
            title='글자 색상'
          />
          <input
            type='color'
            onChange={(e) => execCommand('hiliteColor', e.target.value)}
            title='글자 배경색'
            style={{ marginRight: '5px' }}
          />
          <button
            onClick={() => execCommand('justifyLeft')}
            className={styles.toolbarButton}
          >
            <img
              src='/assets/post/editor/format_align_left.png'
              alt='왼쪽정렬'
              className={styles.toolbarAlign}
            />
          </button>
          <button
            onClick={() => execCommand('justifyCenter')}
            className={styles.toolbarButton}
          >
            <img
              src='/assets/post/editor/format_align_center.png'
              alt='가운데정렬'
              className={styles.toolbarAlign}
            />
          </button>
          <button
            onClick={() => execCommand('justifyRight')}
            className={styles.toolbarButton}
          >
            <img
              src='/assets/post/editor/format_align_right.png'
              alt='오른쪽정렬'
              className={styles.toolbarAlign}
            />
          </button>
          <button
            onClick={() => execCommand('justifyFull')}
            className={styles.toolbarButton}
          >
            <img
              src='/assets/post/editor/format_align_justify.png'
              alt='전체정렬'
              className={styles.toolbarAlign}
            />
          </button>
          <SizedBox width={5} />
          <input
            type='file'
            ref={imageRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
            accept='image/*'
          />
          <button onClick={handleImageButtonClick}>
            <img
              src='/assets/post/editor/picture.png'
              alt='전체정렬'
              className={styles.toolbarAlign}
            />
          </button>
          <input
            type='file'
            ref={videoRef} // 동영상 파일 입력 요소
            onChange={handleVideoChange}
            style={{ display: 'none' }}
            accept='video/*' // 동영상 파일만 선택 가능하도록 설정
          />
          <button onClick={handleVideoButtonClick}>
            <img
              src='/assets/post/editor/video.png'
              alt='전체정렬'
              className={styles.toolbarAlign}
            />
          </button>
          {/* 동영상 업로드 버튼 */}
          <input
            type='file'
            ref={audioRef} // 오디오 파일 입력 요소
            onChange={handleAudioChange}
            style={{ display: 'none' }}
            accept='audio/mpeg' // MP3 파일만 선택 가능하도록 설정
          />
          <button onClick={handleAudioButtonClick}>
            <img
              src='/assets/post/editor/audio.png'
              alt='전체정렬'
              className={styles.toolbarAlign}
            />
          </button>
          {/* 오디오 업로드 버튼 */}
        </div>
        <div
          className={styles.editor}
          contentEditable
          ref={editorRef}
          suppressContentEditableWarning={true}
          spellCheck='false'
        ></div>
      </div>
      <div className={styles.editorButtonDiv}>
        <button
          className={styles.cancelButton}
          onClick={handleCancelButtonClick}
        >
          취소
        </button>
        <BoardButton
          buttonText={'등록'}
          onClick={handleSubmit}
          selectedType={'등록'}
        />
      </div>
    </>
  );
};

export default EditorForm;
