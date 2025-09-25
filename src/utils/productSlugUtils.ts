export interface CategoryMapping {
  [key: string]: string;
}

// Map English categories to Vietnamese slugs
export const categoryMappings: CategoryMapping = {
  'beauty': 'my-pham',
  'fragrances': 'nuoc-hoa',
  'furniture': 'noi-that',
  'groceries': 'thuc-pham',
  'home-decoration': 'trang-tri-nha',
  'kitchen-accessories': 'dung-cu-nha-bep',
  'laptops': 'may-tinh-xach-tay',
  'mens-shirts': 'ao-nam',
  'mens-shoes': 'giay-nam',
  'mens-watches': 'dong-ho-nam',
  'mobile-accessories': 'phu-kien-dien-thoai',
  'motorcycle': 'xe-may',
  'skin-care': 'cham-soc-da',
  'smartphones': 'dien-thoai',
  'sports-accessories': 'phu-kien-the-thao',
  'sunglasses': 'kinh-mat',
  'tablets': 'may-tinh-bang',
  'tops': 'ao-kieu',
  'vehicle': 'xe-co',
  'womens-bags': 'tui-xach-nu',
  'womens-dresses': 'dam-nu',
  'womens-jewellery': 'trang-suc-nu',
  'womens-shoes': 'giay-nu',
  'womens-watches': 'dong-ho-nu',
  // Default mapping for tiles and sanitary ware
  'tiles': 'gach-op-lat',
  'decorative-tiles': 'gach-trang-tri',
  'floor-tiles': 'gach-san',
  'wall-tiles': 'gach-tuong',
  'sanitary-ware': 'thiet-bi-ve-sinh',
  'bathroom-accessories': 'phu-kien-phong-tam',
  'kitchen-tiles': 'gach-nha-bep',
  'ceramic': 'gom-su',
  'granite': 'da-granite',
  'marble': 'da-hoa-cuong'
};

// Reverse mapping for slug to English category
export const reverseCategoryMappings: CategoryMapping = Object.fromEntries(
  Object.entries(categoryMappings).map(([key, value]) => [value, key])
);

export function generateProductSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function getCategorySlug(category: string): string {
  const categoryKey = category.toLowerCase().replace(/\s+/g, '-');
  return categoryMappings[categoryKey] || 'san-pham-khac';
}

export function getCategoryFromSlug(slug: string): string {
  return reverseCategoryMappings[slug] || slug;
}

export function generateProductUrl(category: string, title: string, id: number): string {
  const categorySlug = getCategorySlug(category);
  const productSlug = generateProductSlug(title);
  return `/${categorySlug}/${productSlug}-${id}`;
}

export function extractProductIdFromSlug(productSlug: string): number | null {
  const match = productSlug.match(/-(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

export function generateBreadcrumbFromSlugs(categorySlug: string, productSlug: string) {
  const category = getCategoryFromSlug(categorySlug);
  const productName = productSlug.replace(/-\d+$/, '').replace(/-/g, ' ');
  
  return {
    category: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' '),
    product: productName.charAt(0).toUpperCase() + productName.slice(1)
  };
}