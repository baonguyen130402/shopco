# Hướng Dẫn Sử Dụng Font cho Website Gạch Ốp Lát & Nội Thất

## 🎨 Hệ Thống Font Tối Ưu - 2 Font Chính

Website đã được cập nhật với hệ thống font tối ưu, sử dụng chỉ 2 font chính để đảm bảo tính nhất quán và hiệu suất tốt nhất, đồng thời phù hợp với ngành gạch ốp lát và nội thất.

### 📚 Hai Font Chính

#### 1. **Playfair Display** - Font cho tiêu đề và logo
- **Mục đích**: Logo, tiêu đề lớn, headings, tạo cảm giác sang trọng
- **Đặc điểm**: Elegant, luxury, serif, phù hợp với nội thất cao cấp
- **Cách sử dụng**: `font-playfair`, `font-display`, `font-heading`
- **Weights**: 400, 500, 600, 700, 800, 900
- **Ứng dụng**: Logo "TPHOME", tiêu đề chính, section headers

#### 2. **Lato** - Font cho nội dung và UI
- **Mục đích**: Văn bản chính, mô tả sản phẩm, buttons, UI elements, giá cả
- **Đặc điểm**: Clean, readable, sans-serif, hỗ trợ tiếng Việt tốt
- **Cách sử dụng**: `font-lato`, `font-body`, `font-content`
- **Weights**: 300, 400, 700, 900
- **Ứng dụng**: Body text, product descriptions, prices, buttons, navigation

## 🛠️ Cách Sử Dụng

### Trong Tailwind CSS:

```html
<!-- Tiêu đề chính -->
<h1 className="font-playfair font-bold text-4xl">GẠCH ỐP LÁT CAO CẤP</h1>

<!-- Logo -->
<div className="font-playfair font-bold text-3xl">TPHOME</div>

<!-- Nội dung mô tả -->
<p className="font-lato text-base">Mô tả sản phẩm gạch ốp lát chất lượng cao...</p>

<!-- Button/CTA -->
<button className="font-lato font-medium">Mua Ngay</button>

<!-- Giá cả -->
<span className="font-lato font-bold text-2xl">1.250.000đ</span>

<!-- Statistics -->
<span className="font-lato font-bold text-3xl">500+</span>
```

### Sử dụng Utility Classes:

```html
<!-- Font display cho tiêu đề sang trọng -->
<h1 className="font-display luxury-title">TPHOME</h1>

<!-- Font body cho nội dung -->
<p className="font-body clean-text vietnamese-text">Nội dung tiếng Việt...</p>

<!-- Font heading cho các tiêu đề phụ -->
<h2 className="font-heading">Gạch Cao Cấp</h2>

<!-- Font content cho mô tả -->
<div className="font-content">Mô tả sản phẩm chi tiết...</div>

<!-- Pricing với font Lato -->
<div className="price-text">1,250,000đ</div>
```

## 🎯 Ứng Dụng Theo Ngành

### Gạch Ốp Lát & Nội Thất:

1. **Logo & Branding**: `font-playfair` - tạo cảm giác sang trọng, đẳng cấp
2. **Tiêu đề sản phẩm**: `font-playfair` - elegant, luxury
3. **Mô tả chi tiết**: `font-lato` - dễ đọc, chuyên nghiệp
4. **Giá cả & số liệu**: `font-lato` - rõ ràng, tabular numbers
5. **Call-to-action**: `font-lato` - clean, friendly
6. **Navigation**: `font-lato` - consistent UI experience

### Đặc Điểm Tiếng Việt:

- ✅ Hỗ trợ đầy đủ dấu tiếng Việt
- ✅ Rendering mượt mà với `antialiased`
- ✅ Font-feature-settings được tối ưu
- ✅ Fallback fonts cho trường hợp không load được

## 🔧 Tùy Chỉnh

### Thêm font weight mới:
Chỉnh sửa trong `src/styles/fonts/index.ts`:

```typescript
const lato = Lato({
  weight: ["300", "400", "700", "900"], // Có thể thêm "100", "200"
  // ...
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"], // Đầy đủ weights
  // ...
});
```

### Thêm utility class mới:
Trong `src/styles/globals.css`:

```css
.font-product-title {
  font-family: var(--font-playfair), serif;
  font-weight: 600;
  letter-spacing: -0.02em;
}
```

## 📱 Responsive

Fonts tự động scale responsive với Tailwind:

```html
<h1 className="font-playfair text-2xl md:text-4xl lg:text-6xl">
  Responsive Title
</h1>
```

## 🌍 SEO & Performance

- **Tối ưu hóa**: Chỉ sử dụng 2 font chính để giảm tải
- **Subset optimization**: Latin + Latin-ext hỗ trợ tiếng Việt
- **Display swap**: Tránh FOIT (Flash of Invisible Text)
- **Preload**: Google Fonts được preload tự động
- **Fallback fonts**: Georgia (serif) + Arial (sans-serif)
- **Consistent loading**: Cải thiện Core Web Vitals

## 🎨 Thiết Kế Thương Hiệu

Hệ thống 2 font này tạo nên:
- 🎯 **Nhận diện thương hiệu rõ ràng**: Playfair Display cho logo & headings
- 📖 **Khả năng đọc tốt**: Lato cho tất cả nội dung
- 💼 **Tính chuyên nghiệp**: Phù hợp ngành xây dựng & nội thất
- 🇻🇳 **Hỗ trợ tiếng Việt**: Hiển thị hoàn hảo các ký tự có dấu
- ⚡ **Hiệu suất cao**: Tải nhanh, ít băng thông

### Phù hợp với:
- 🏠 Showroom gạch ốp lát
- 🛋️ Cửa hàng nội thất cao cấp
- 🏗️ Công ty xây dựng
- 🎨 Studio thiết kế nội thất
- 🏪 E-commerce building materials

---

**Kết luận**: Hệ thống 2 font này tối ưu hóa cả về mặt thiết kế và hiệu suất, tạo ra trải nghiệm người dùng nhất quán và chuyên nghiệp cho thị trường Việt Nam trong ngành xây dựng và nội thất.