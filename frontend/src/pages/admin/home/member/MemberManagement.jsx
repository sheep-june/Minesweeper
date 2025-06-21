import styles from './manualAuth/ManualAuth.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import {
  deleteMember,
  fetchTotalMemberList,
} from '../../../../redux/slices/admin/adminThunk.js';
import { usePagination, useSortBy, useTable } from 'react-table';
import PaginationButton from '../../../../component/admin/navigation/button/pagination/PaginationButton.jsx';
import BoardButton from '../../../../component/admin/navigation/button/board/BoardButton.jsx';

const MemberManagement = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const totalMemberList = useSelector((state) => state.admin.totalMemberList);

  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const serverData = useMemo(() => totalMemberList, [totalMemberList]);

  const handleSearchButtonClick = () => {
    setSearchTerm(search);
  };

  const handleDeleteButtonClick = (deleteId) => {
    dispatch(deleteMember({ token: token, memberId: deleteId }));
  };

  const data = useMemo(
    () =>
      serverData.filter((item) =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [serverData, searchTerm],
  );

  const columns = useMemo(
    () => [
      { Header: '아이디', accessor: 'id' },
      { Header: '이메일', accessor: 'email' },
      {
        Header: '인증방법',
        accessor: (row) => (row.addressAuth ? '수동인증' : '자동인증'),
      },
      { Header: '인증지역', accessor: 'region' },
      {
        Header: '등록일',
        accessor: (row) => row.registrationTime.split('T')[0],
      },
      {
        Header: '삭제', // 새로운 컬럼 헤더
        accessor: 'delete', // 임의의 accessor
        Cell: ({ row }) => (
          <button
            className={styles.deleteButton}
            onClick={() => handleDeleteButtonClick(row.original.id)}
          >
            삭제
          </button>
        ),
        disableSortBy: true, // 정렬 비활성화 (선택 사항)
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
    dispatch(fetchTotalMemberList(token));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>전체 유저 관리</div>
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
            placeholder='아이디 검색'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <BoardButton buttonText={'검색'} onClick={handleSearchButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default MemberManagement;
