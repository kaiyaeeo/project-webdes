// Data Algoritma
const algoritmaData = [
    { title: "Bubble Sort", desc: "Mengurutkan dengan menukar elemen bersebelahan. O(n²).", code: "for(let i=0; i<n-1; i++)\n  for(let j=0; j<n-i-1; j++)\n    if(arr[j]>arr[j+1]) [arr[j],arr[j+1]]=[arr[j+1],arr[j]];" },
    { title: "Binary Search", desc: "Pencarian cepat di array terurut. O(log n).", code: "function binarySearch(arr, x) {\n  let l=0, r=arr.length-1;\n  while(l<=r) {\n    let mid=Math.floor((l+r)/2);\n    if(arr[mid]===x) return mid;\n    else if(arr[mid]<x) l=mid+1;\n    else r=mid-1;\n  }\n  return -1;\n}" },
    { title: "Rekursi (Faktorial)", desc: "Fungsi memanggil diri sendiri.", code: "function faktorial(n) {\n  if(n<=1) return 1;\n  return n * faktorial(n-1);\n}" }
];

const strukturDataData = [
    { title: "Stack", desc: "LIFO: push, pop. Contoh: undo/redo.", code: "class Stack {\n  constructor() { this.items=[]; }\n  push(item){ this.items.push(item); }\n  pop(){ return this.items.pop(); }\n}" },
    { title: "Queue", desc: "FIFO: enqueue, dequeue.", code: "class Queue {\n  constructor(){ this.items=[]; }\n  enqueue(item){ this.items.push(item); }\n  dequeue(){ return this.items.shift(); }\n}" },
    { title: "Linked List", desc: "Node saling terhubung.", code: "class Node { constructor(data){ this.data=data; this.next=null; } }" },
    { title: "Binary Tree", desc: "Struktur hierarkis dengan root.", code: "class TreeNode {\n  constructor(val){ this.val=val; this.left=null; this.right=null; }\n}" }
];

const summaryHTML = `
    <h3><i class="fas fa-chart-line"></i> Kompleksitas Waktu (Big-O)</h3>
    <table class="summary-table">
        <tr><th>Struktur/Algoritma</th><th>Rata-rata</th><th>Terburuk</th></tr>
        <tr><td>Bubble Sort</td><td>O(n²)</td><td>O(n²)</td></tr>
        <tr><td>Binary Search</td><td>O(log n)</td><td>O(log n)</td></tr>
        <tr><td>Stack/Queue</td><td>O(1)</td><td>O(1)</td></tr>
        <tr><td>Linked List (search)</td><td>O(n)</td><td>O(n)</td></tr>
        <tr><td>Binary Search Tree</td><td>O(log n)</td><td>O(n)</td></tr>
    </table>
    <h3><i class="fas fa-lightbulb"></i> Poin Penting</h3>
    <ul class="summary-list">
        <li><i class="fas fa-check-circle"></i> Array: akses O(1), insert/delete O(n).</li>
        <li><i class="fas fa-check-circle"></i> Stack & Queue: ideal untuk BFS/DFS, manajemen state.</li>
        <li><i class="fas fa-check-circle"></i> Linked List: dinamik, efisien untuk insert/delete di tengah.</li>
        <li><i class="fas fa-check-circle"></i> Hash Table: pencarian O(1) rata-rata.</li>
    </ul>
    <h3><i class="fas fa-terminal"></i> Tips Belajar</h3>
    <p>• Visualisasikan algoritma dengan diagram.<br>• Latih soal di LeetCode / HackerRank.<br>• Pahami trade-off antara waktu dan memori.</p>
`;

function renderCards(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.map(item => `
        <div class="card">
            <div class="card-icon"><i class="fas fa-code-branch"></i></div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <div class="code-snippet"><pre>${escapeHtml(item.code)}</pre></div>
        </div>
    `).join('');
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[m] || m));
}

function updateStats() {
    document.getElementById('totalTopics').innerText = algoritmaData.length + strukturDataData.length;
    document.getElementById('totalExamples').innerText = algoritmaData.length + strukturDataData.length;
}

function initNavbar() {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('navMenu');
    if (toggle) toggle.onclick = () => menu.classList.toggle('active');
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('active'));
    });
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            if (pageYOffset >= section.offsetTop - 100) current = section.id;
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });
}

function loadSummary() {
    document.getElementById('summaryContent').innerHTML = summaryHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    renderCards('algoritmaGrid', algoritmaData);
    renderCards('strukturDataGrid', strukturDataData);
    updateStats();
    loadSummary();
    initNavbar();
});