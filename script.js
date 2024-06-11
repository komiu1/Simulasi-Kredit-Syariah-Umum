function formatRupiah(input) {
  var value = input.value;
  // Menghapus karakter selain angka
  value = value.replace(/[^\d]/g, '');

  // Menambahkan titik sebagai pemisah ribuan
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Menambahkan "IDR " di depan nilai
  value = "Rp " + value;

  // Mengupdate nilai pada input
  input.value = value;
}

function calculate() {
  var namaBarang = document.getElementById('nama-barang').value;
  var hargaBarang = parseInt(document.getElementById('harga-barang').value.replace(/[^\d]/g, ''));
  var uangMuka = parseInt(document.getElementById('uang-muka').value.replace(/[^\d]/g, ''));
  var namaAnggota = document.getElementById('nama-anggota').value.trim();
  var nomorHP = document.getElementById('nomor-hp').value.trim();
  

  // Validasi nama anggota hanya huruf
  if (!/^[a-zA-Z\s]+$/.test(namaAnggota)) {
    document.getElementById('result').innerHTML = "Nama Anggota hanya boleh berisi huruf.";
    return;
  }

  // Validasi nomor HP hanya angka dan maksimal 12 karakter
  if (!/^\d{1,12}$/.test(nomorHP)) {
    document.getElementById('result').innerHTML = "Nomor HP hanya boleh berisi angka dan maksimal 12 karakter.";
    return;
  }

  // Validasi nama barang tidak boleh kosong
  if (namaBarang.trim() === '') {
    document.getElementById('result').innerHTML = "Nama Barang tidak boleh kosong.";
    return;
  }

  if (isNaN(uangMuka)) {
    uangMuka = 0;
    document.getElementById('uang-muka').value = "Rp 0";
  }

  if (uangMuka > hargaBarang) {
    document.getElementById('result').innerHTML = "Uang Muka tidak boleh melebihi Harga Barang.";
    return;
  }

  var angsuran = parseInt(document.getElementById('angsuran').value);

  if (isNaN(angsuran)) {
    angsuran = 0;
  }

  if (angsuran > 24) {
    document.getElementById('result').innerHTML = "Angsuran tidak boleh lebih dari 24 bulan.";
    return;
  }

  // Validasi harga barang
  if (hargaBarang == 0) {
    alert('Harga barang tidak boleh nol!'); // Menampilkan pesan kesalahan
    return; // Menghentikan perhitungan
  }

  var angsuranPokok = hargaBarang - uangMuka;
  var pokokBulanan = angsuranPokok / angsuran;
  var margin = 0.70 * angsuranPokok * angsuran / 24; // 70% pertahun 2 tahun
  var marginBulanan = margin / angsuran;
  var angsuranBulanan = pokokBulanan + marginBulanan;
  var jumlahAngsuran = angsuranPokok + margin;

  document.getElementById('result').innerHTML = `
    <p>Angsuran Bulanan: ${formatCurrency(angsuranBulanan)}</p>
    <p>Jumlah Angsuran: ${formatCurrency(jumlahAngsuran)}</p>
  `;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

function sendMessageOnWhatsApp() {
  var namaAnggota = document.getElementById('nama-anggota').value.trim();
  var nomorHP = document.getElementById('nomor-hp').value.trim();
  var namaBarang = document.getElementById('nama-barang').value.trim();
  var hargaBarang = document.getElementById('harga-barang').value.trim();
  var uangMuka = document.getElementById('uang-muka').value.trim();
  var angsuran = document.getElementById('angsuran').value.trim();

  // Validasi nama anggota hanya huruf
  if (!/^[a-zA-Z\s]+$/.test(namaAnggota)) {
    document.getElementById('result').innerHTML = "Nama Anggota hanya boleh berisi huruf.";
    return;
  }

  // Validasi nomor HP hanya angka dan maksimal 12 karakter
  if (!/^\d{1,12}$/.test(nomorHP)) {
    document.getElementById('result').innerHTML = "Nomor HP hanya boleh berisi angka dan maksimal 12 karakter.";
    return;
  }

  // Membuat pesan yang berisi data inputan
  var message = `Nama Anggota: ${namaAnggota}%0ANomor HP: ${nomorHP}%0ANama Barang: ${namaBarang}%0AHarga Barang: ${hargaBarang}%0AUang Muka: ${uangMuka}%0AAngsuran: ${angsuran} bulan`;

  // Membuat tautan WhatsApp dengan pesan yang sesuai
  var whatsappLink = `https://wa.me/6282325333435?text=${message}`;

  // Mengarahkan pengguna ke tautan WhatsApp
  window.open(whatsappLink, '_blank');
}
