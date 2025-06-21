import Header from '../../component/header/Header.jsx';
import NavigationBar from '../../component/navigation/NavigationBar.jsx';
import Main from '../../component/main/Main.jsx';
import Title from '../../component/main/title/Title.jsx';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usePagination, useSortBy, useTable } from 'react-table';
import styles from './BoardList.module.css';
import BoardButton from '../../component/admin/navigation/button/board/BoardButton.jsx';
import PageSizeSelect from '../../component/admin/navigation/select/PageSizeSelect.jsx';
import PaginationButton from '../../component/admin/navigation/button/pagination/PaginationButton.jsx';
import Footer from '../../component/footer/Footer.jsx';
import { fetchNoticeBoardList } from '../../redux/slices/board/boardThunk.js';

const NoticeBoardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { noticeBoardList, isLoading } = useSelector((state) => state.board);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedType, setSelectedType] = useState('전체글');

  useEffect(() => {
    dispatch(fetchNoticeBoardList());
  }, [dispatch]);

  const serverData = useMemo(() => noticeBoardList, [noticeBoardList]);

  const data = useMemo(
    () =>
      serverData
        .filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.content.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .map((item) => ({
          ...item,
          repliesLength: item.replies.length,
        })),
    [serverData, searchTerm],
  );

  const handleSearchButtonClick = () => {
    setSearchTerm(search);
  };

  const handleRowClick = (row) => {
    const postId = row.cells[0].value;
    navigate(`/boardDetail/${postId}`);
  };

  const columns = useMemo(
    () => [
      {
        Header: '번호',
        accessor: 'id',
      },
      {
        Header: '말머리',
        accessor: 'boardType',
      },
      {
        Header: '제목',
        accessor: 'title',
        Cell: ({ row }) => (
          <span>
            {row.original.title}{' '}
            <span style={{ color: 'red', fontSize: '12px' }}>
              [{row.original.repliesLength}]
            </span>
          </span>
        ),
        minWidth: 300,
        maxWidth: 600,
      },
      {
        Header: '글쓴이',
        accessor: (row) => row.member.id,
      },
      {
        Header: '작성일',
        accessor: (row) => row.createdTime.split('T')[0],
      },
      {
        Header: '조회',
        accessor: 'viewCount',
      },
      {
        Header: '추천',
        accessor: 'likeCount',
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
  );

  return (
    <>
      {/* 홈화면 상단 부분 컴포넌트 */}
      <Header />
      {/* 네비게이션 바 컴포넌트 */}
      <NavigationBar />

      <Main
        Content={
          isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {/*제목 컴포넌트*/}
              <Title titleText={`공지사항 게시판`} />
              <div className={styles.boardButtonDiv}>
                <div className={styles.boardTypeDiv}></div>
                <div className={styles.boardWriteButtonDiv}>
                  <PageSizeSelect
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                  />
                </div>
              </div>

              <table className={styles.table} {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr
                      className={styles.tableHeader}
                      {...headerGroup.getHeaderGroupProps()}
                      style={{ borderBottom: '1px solid #000000' }}
                      key='theadRow'
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps(),
                          )}
                          style={{ minWidth: column.minWidth }}
                          key={column.id}
                        >
                          {column.render('Header')}

                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                              : ''}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className={styles.tableBody} {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={styles.tableBodyRow}
                        style={{
                          borderBottom: '1px solid #ddd',
                        }}
                        key={row.id}
                        onClick={() => handleRowClick(row)}
                      >
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: '8px',
                              textAlign: 'center',
                            }}
                            onClick={() => {}}
                            key={`${cell.column.Header} ${cell.row.id}`}
                          >
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* 페이징 컨트롤 */}
              <div className={styles.pagination}>
                <PaginationButton
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                  buttonImagePath='/assets/admin/navi/button/left_left_arrow.png'
                />
                <PaginationButton
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  buttonImagePath='/assets/admin/navi/button/left_arrow.png'
                />
                {pageOptions.map((pageOption) => (
                  <button
                    key={pageOption}
                    onClick={() => gotoPage(pageOption)}
                    className={`${styles.pageButton} ${
                      pageOption === pageIndex ? styles.activePage : ''
                    }`}
                  >
                    {pageOption + 1}
                  </button>
                ))}

                <PaginationButton
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  buttonImagePath='/assets/admin/navi/button/right_arrow.png'
                />
                <PaginationButton
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                  buttonImagePath='/assets/admin/navi/button/right_right_arrow.png'
                />
              </div>
              <div className={styles.searchDiv}>
                <input
                  type='text'
                  placeholder='제목, 내용 검색'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={styles.searchInput}
                />
                <BoardButton
                  buttonText={'검색'}
                  onClick={handleSearchButtonClick}
                />
              </div>
            </>
          )
        }
      />

      <Footer />
    </>
  );
};

export default NoticeBoardList;
