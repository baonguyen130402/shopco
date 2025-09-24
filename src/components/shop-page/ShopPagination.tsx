import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ShopPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function ShopPagination({ currentPage, totalPages }: ShopPaginationProps) {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis-start');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis-end');
      }
      
      // Always show last page if more than 1 page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pages = generatePageNumbers();
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <Pagination className="justify-between">
      <PaginationPrevious 
        href={hasPrevious ? `/shop?page=${currentPage - 1}` : '#'} 
        className={`border border-black/10 ${!hasPrevious ? 'pointer-events-none opacity-50' : ''}`}
      />
      
      <PaginationContent>
        {pages.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis className="text-black/50 font-medium text-sm" />
              </PaginationItem>
            );
          }
          
          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;
          
          return (
            <PaginationItem key={pageNumber} className={pageNumber > 3 && pageNumber < totalPages - 2 ? "hidden lg:block" : ""}>
              <PaginationLink
                href={`/shop?page=${pageNumber}`}
                className={`text-black/50 font-medium text-sm ${isActive ? 'text-white' : ''}`}
                isActive={isActive}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>

      <PaginationNext 
        href={hasNext ? `/shop?page=${currentPage + 1}` : '#'} 
        className={`border border-black/10 ${!hasNext ? 'pointer-events-none opacity-50' : ''}`}
      />
    </Pagination>
  );
}
