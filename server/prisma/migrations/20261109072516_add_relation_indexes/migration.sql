-- CreateIndex
CREATE INDEX "Banner_isDeleted_isActive_idx" ON "Banner"("isDeleted", "isActive");

-- CreateIndex
CREATE INDEX "Blog_blogCategoryId_idx" ON "Blog"("blogCategoryId");

-- CreateIndex
CREATE INDEX "Blog_deleted_active_idx" ON "Blog"("deleted", "active");

-- CreateIndex
CREATE INDEX "BlogCategory_active_idx" ON "BlogCategory"("active");

-- CreateIndex
CREATE INDEX "Cart_orderedById_idx" ON "Cart"("orderedById");

-- CreateIndex
CREATE INDEX "CartItem_productId_idx" ON "CartItem"("productId");

-- CreateIndex
CREATE INDEX "CartProduct_cartId_idx" ON "CartProduct"("cartId");

-- CreateIndex
CREATE INDEX "CartProduct_productId_idx" ON "CartProduct"("productId");

-- CreateIndex
CREATE INDEX "Category_isDeleted_isActive_idx" ON "Category"("isDeleted", "isActive");

-- CreateIndex
CREATE INDEX "Content_contentType_idx" ON "Content"("contentType");

-- CreateIndex
CREATE INDEX "Content_deleted_active_idx" ON "Content"("deleted", "active");

-- CreateIndex
CREATE INDEX "Coupon_active_idx" ON "Coupon"("active");

-- CreateIndex
CREATE INDEX "Coupon_expiry_idx" ON "Coupon"("expiry");

-- CreateIndex
CREATE INDEX "GalleryCategory_deleted_active_idx" ON "GalleryCategory"("deleted", "active");

-- CreateIndex
CREATE INDEX "GalleryDetails_galleryCategoryId_idx" ON "GalleryDetails"("galleryCategoryId");

-- CreateIndex
CREATE INDEX "GalleryDetails_deleted_active_idx" ON "GalleryDetails"("deleted", "active");

-- CreateIndex
CREATE INDEX "Gst_isDeleted_isActive_idx" ON "Gst"("isDeleted", "isActive");

-- CreateIndex
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");

-- CreateIndex
CREATE INDEX "Order_couponId_idx" ON "Order"("couponId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_subCategoryId_idx" ON "Product"("subCategoryId");

-- CreateIndex
CREATE INDEX "Product_subSubCategoryId_idx" ON "Product"("subSubCategoryId");

-- CreateIndex
CREATE INDEX "Product_gstId_idx" ON "Product"("gstId");

-- CreateIndex
CREATE INDEX "Product_mainProductId_idx" ON "Product"("mainProductId");

-- CreateIndex
CREATE INDEX "Product_isActive_idx" ON "Product"("isActive");

-- CreateIndex
CREATE INDEX "Stock_productId_idx" ON "Stock"("productId");

-- CreateIndex
CREATE INDEX "Stock_date_idx" ON "Stock"("date");

-- CreateIndex
CREATE INDEX "SubCategory_categoryId_idx" ON "SubCategory"("categoryId");

-- CreateIndex
CREATE INDEX "SubCategory_isDeleted_isActive_idx" ON "SubCategory"("isDeleted", "isActive");

-- CreateIndex
CREATE INDEX "SubSubCategory_categoryId_idx" ON "SubSubCategory"("categoryId");

-- CreateIndex
CREATE INDEX "SubSubCategory_subCategoryId_idx" ON "SubSubCategory"("subCategoryId");

-- CreateIndex
CREATE INDEX "SubSubCategory_isDeleted_isActive_idx" ON "SubSubCategory"("isDeleted", "isActive");

-- CreateIndex
CREATE INDEX "Token_userId_idx" ON "Token"("userId");

-- CreateIndex
CREATE INDEX "Token_customerId_idx" ON "Token"("customerId");

-- CreateIndex
CREATE INDEX "Token_token_expiresAt_idx" ON "Token"("token", "expiresAt");

-- CreateIndex
CREATE INDEX "UserRole_roleId_idx" ON "UserRole"("roleId");

-- CreateIndex
CREATE INDEX "WishlistItem_productId_idx" ON "WishlistItem"("productId");
