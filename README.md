## TAO BIN Forecaster Dashboard

โปรเจกต์นี้คือแดชบอร์ดสำหรับดูแลตู้กดเครื่องดื่ม TAO BIN พร้อมดูแนวโน้มรายได้จากสภาพอากาศและแสดงข้อมูลรายวันแบบเข้าใจง่าย ใช้ Next.js + TypeScript + TailwindCSS + React Query

---

### Features

- **Machine Management** – เพิ่ม แก้ไข ลบ ตู้กดได้จากฟอร์มพร้อมตรวจสอบข้อมูลและแจ้งผลด้วย toast
- **Automatic Data Persistence** – รายการตู้ทั้งหมดเก็บไว้ใน `localStorage` ของเบราว์เซอร์
- **Highlight Latest Row** – ช่วยให้เห็นแถวที่เพิ่งเพิ่มหรือแก้ไขได้ทันที
- **Statistics Cards** – สรุปทำเลที่ขายดีที่สุด จำนวนตู้ และยอดขายรวม
- **Weekly Performance Summary** – แสดงรายได้ ค่าเช่า ค่าไฟ และกำไร/ขาดทุนใน 7 วัน
- **7-Day Forecast Chart** – เปรียบเทียบค่าไฟกับกำไร/ขาดทุน
- **7-Day Forecast Table** – แสดงข้อมูลอุณหภูมิ ค่าไฟ และกำไร/ขาดทุนรายวัน
- **Error Notification** – ถ้าดึงข้อมูลอากาศไม่ได้ จะมี toast และข้อความบนหน้าจอให้รู้ทันที

---

### Teck Stack

- Next.js 15 (Pages Router) + React 19
- TypeScript 5
- TailwindCSS 4
- React Query 5
- React Hook Form + Zod
- Recharts, React Toastify, React Loading Skeleton
- Lucide Icons

---

### Prerequisites

| รายการ  | เวอร์ชันที่แนะนำ  |
| ------- | ----------------- |
| Node.js | >= 18 (แนะนำ 20+) |
| npm     | >= 9              |

> โปรเจกต์ใช้ API ของ [Open-Meteo](https://open-meteo.com/) สำหรับข้อมูลสภาพอากาศ ไม่ต้องใช้คีย์เพิ่มเติม

---

### Installation and Running the Project

1. ติดตั้งแพ็กเกจที่ต้องใช้

   ```bash
   npm install
   ```

2. รันเซิร์ฟเวอร์สำหรับพัฒนา

   ```bash
   npm run dev
   ```

   เปิดเบราว์เซอร์ไปที่ http://localhost:3000

3. สร้าง build สำหรับ production

   ```bash
   npm run build
   ```

4. รันเซิร์ฟเวอร์ production (หลัง build เสร็จ)

   ```bash
   npm run start
   ```

---

### Project Structure

- `src/pages/` – จุดเริ่ม routing และหน้าแดชบอร์ด (`_app.tsx`, `index.tsx`)
- `src/components/machines/` – ส่วน Machine Admin เช่น ตารางและโมดัล (`MachineTable.tsx`, `MachineModal.tsx`, `MachineDeleteConfirmModal.tsx`)
- `src/components/dashboard/` – UI ด้านพยากรณ์และการ์ดสรุป (`BestLocationCard.tsx`, `ForecastChart.tsx`, `ForecastTable.tsx`, `WeeklySummaryCard.tsx`)
- `src/hooks/` – custom hooks (`useMachines.tsx`, `useForecastData.ts`, `useBodyScrollLock.ts`)
- `src/lib/` – โค้ดช่วยเรื่องโดเมน เช่น สรุปและดึงอากาศ (`forecast.ts`, `summary.ts`, `weather.ts`, `storage.ts`)
- `src/schemas/` – Zod schema สำหรับตรวจสอบข้อมูลเครื่อง (`machine.schema.ts`)
- `src/types/` – type ที่ใช้ร่วมกัน (`machine.ts`, `forecast.ts`, `weather.ts`, `global.d.ts`)
- `src/utils/` – ฟังก์ชันช่วยเล็ก ๆ (`number.ts`)

---

### Developer Tips

- Machine Admin Panel ใช้ `localStorage` ในเบราว์เซอร์ ดังนั้นหากต้องการรีเซ็ตข้อมูลให้ล้าง `localStorage` key `machines`
- ถ้า API สภาพอากาศไม่ตอบสนอง จะมี toast error และ UI ส่วนพยากรณ์จะแสดงข้อความแจ้งให้ทราบ
- สามารถปรับ seed data ของเครื่องได้ที่ `src/hooks/useMachines.tsx`

---
