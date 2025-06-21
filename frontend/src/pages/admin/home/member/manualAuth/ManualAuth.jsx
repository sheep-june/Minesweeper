import styles from './ManualAuth.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import {
  fetchManualAuthList,
  updateManualAuth,
} from '../../../../../redux/slices/admin/adminThunk.js';
import { usePagination, useSortBy, useTable } from 'react-table';
import PaginationButton from '../../../../../component/admin/navigation/button/pagination/PaginationButton.jsx';
import Modal from '../../../../../component/common/modal/Modal.jsx';

const ManualAuth = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const manualAuthList = useSelector((state) => state.admin.manualAuthList);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSelectedModalOpen, setSelectedModalOpen] = useState(false);
  const [region, setRegion] = useState('');

  const serverData = useMemo(() => manualAuthList, [manualAuthList]);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setSelectedModalOpen(true);
  };

  const handleRegionAuthClick = () => {
    dispatch(
      updateManualAuth({
        token: token,
        data: { id: selectedRow.original.id, region: region },
      }),
    )
      .then(() => setSelectedModalOpen(false))
      .catch((error) => console.log(error));
  };

  const data = useMemo(() => serverData, [serverData]);

  const columns = useMemo(
    () => [
      { Header: '아이디', accessor: 'id' },
      { Header: '이메일', accessor: 'email' },
      {
        Header: '인증방법',
        accessor: (row) => (row.addressAuth ? '수동인증' : '자동인증'),
      },
      {
        Header: '신분증 사진',
        accessor: 'authCardSourcePath',
        Cell: ({ cell }) => (
          <img
            src={`${baseURL}${cell.value}`}
            alt='신분증사진'
            style={{ width: '100px', height: 'auto' }} // 이미지 크기 조절
          />
        ),
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
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    dispatch(fetchManualAuthList(token));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>유저 수동인증 목록</div>
      <div className={styles.tableContainer}>
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
                    {...column.getHeaderProps(column.getSortByToggleProps())}
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
            placeholder='이름 검색'
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          {/*<BoardButton buttonText={'검색'} onClick={handleSearchButtonClick} />*/}
        </div>
      </div>
      {isSelectedModalOpen && (
        <Modal
          Content={
            <>
              <img
                src={`${baseURL}${selectedRow.original.authCardSourcePath}`}
                alt='신분증사진'
                style={{ width: '500px', height: 'auto' }} // 이미지 크기 조절
              />
              <div style={{ width: '60%', margin: '30px' }}>인증주소</div>
              <input
                type='text'
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                style={{ width: '60%', height: '30px' }}
                placeholder={'인증 지역 입력'}
              />
              <button
                style={{ margin: '30px', width: '100px', height: '50px' }}
                onClick={handleRegionAuthClick}
              >
                지역 인증
              </button>
            </>
          }
          setModalOpen={setSelectedModalOpen}
          className={styles.selectedModal}
        />
      )}
    </div>
  );
};

export default ManualAuth;
