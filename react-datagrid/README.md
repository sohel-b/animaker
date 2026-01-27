# 📊 React Spreadsheet-like DataGrid

A spreadsheet-style DataGrid built **from scratch using React** (no third-party grid or UI libraries).  
The project mimics core behaviors of Excel / Google Sheets such as editable cells, keyboard navigation, drag selection, copy/cut/paste, and dynamic grid expansion.

---
---

## 🛠️ Tech Stack

- React (Functional Components + Hooks)
- JavaScript (ES6+)
- CSS Grid & Sticky Positioning
- No third-party grid or spreadsheet libraries

---

## ✨ Features

### Grid Layout
- Fixed **header row** (columns)
- Fixed **label column** (rows)
- Scrollable grid body
- Sticky headers and row labels
- Single scroll container for perfect alignment

### Editable Cells
- Click / double-click to edit
- **Enter** or blur → save
- **Esc** → cancel edit
- Local edit buffer synced with grid state

### Dynamic Rows & Columns
- Add rows dynamically
- Add columns dynamically
- Grid resizes automatically

### Drag Selection
- Click and drag to select rectangular ranges
- Supports dragging in all directions
- Shift + click to extend selection
- Only body cells are selectable

### Copy / Cut / Paste
- **Ctrl + C** → Copy selected cells
- **Ctrl + X** → Cut selected cells
- **Ctrl + V** → Paste data
- Supports external paste from Excel / Google Sheets
- Parses `\\t` (tabs) and `\\n` (new lines)
- Automatically expands grid on paste overflow
- Native copy/paste works inside input while editing

### Keyboard Navigation
- Arrow keys → move active cell
- **Enter** → move down
- **Tab / Shift + Tab** → move right / left
- Typing starts edit mode (Excel-like)
- Editing mode disables grid shortcuts

### UX Improvements
- Centralized cell dimensions using CSS variables
- Perfect alignment between header, labels, and cells
- Text truncation with ellipsis
- No layout drift on scroll

---

## 🧠 Folder Structure
src/
├─ components/
│ ├─ Grid.jsx // Core grid logic & keyboard handling
│ ├─ HeaderRow.jsx // Column headers
│ ├─ LabelColumn.jsx // Row labels
│ ├─ Cell.jsx // Editable cell (memoized)
│
├─ hooks/
│ └─ useClipboard.js // Copy / cut / paste logic
│
├─ utils/
│ └─ gridUtils.js // Grid helpers & selection normalization
│
├─ App.js
├─ index.js
└─ styles.css



🏗️ Setup Instructions

1. git clone https://github.com/sohel-b/react-datagrid.git
cd react-datagrid

2. Install dependencies
npm install

3. Run locally
npm start
