
const Pagination = ({ total_pages }: { total_pages: number }) => {
     return (
          <div className="pagination">
               {total_pages}
          </div>
     )
}

export default Pagination