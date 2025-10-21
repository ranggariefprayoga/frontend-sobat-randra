# Fase 1: Build (Menginstal dependensi dan membuat build Next.js)
FROM node:22-alpine AS builder

WORKDIR /app
# Menyalin package.json dan package-lock.json (atau yarn.lock) untuk menginstal dependensi
COPY package.json ./
COPY package-lock.json ./ 

# Menginstal dependensi untuk build
RUN npm install 

# Menyalin seluruh kode sumber
COPY . .

# Membuat build produksi Next.js
# Hasilnya akan berada di folder .next/
RUN npm run build 

# ----------------------------------------------------------------------------------

# Fase 2: Production Runner (Image Ramping untuk menjalankan aplikasi)
# Menggunakan image Node.js yang sama (atau lebih kecil) untuk runtime
FROM node:22-alpine AS runner

# Menetapkan environment variable untuk mode produksi
ENV NODE_ENV production
WORKDIR /app

# Menyalin HANYA file-file yang dibutuhkan untuk menjalankan aplikasi:
# 1. package.json dan package-lock.json (untuk npm start)
COPY package.json ./
COPY package-lock.json ./
# 2. Folder public/
COPY public ./public
# 3. Hasil build (.next/) dari build stage
COPY --from=builder /app/.next ./.next
# 4. node_modules (Hanya dependency produksi)
# Karena kita sudah punya package*.json, instal lagi hanya dependency produksi
RUN npm install --omit=dev

# Mengatur port yang akan digunakan oleh Next.js
EXPOSE 3000

# Perintah untuk menjalankan server Next.js
CMD ["npm", "start"]