


const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const { APP_ID, APP_KEY } = process.env;

const FLIGHTS_API_URL = 'https://api.schiphol.nl/public-flights/flights?includedelays=false';

router.get('/', async (req, res) => {
  const page = req.query.page || 0; // Varsayılan olarak `page` 0 (ilk sayfa)
  const limit = 20; // Her sayfada gösterilecek uçuş sayısı

  try {
    const response = await axios.get(`${FLIGHTS_API_URL}&page=${page}`, {
      headers: {
        'Accept': 'application/json',
        'app_id': APP_ID,
        'app_key': APP_KEY,
        'ResourceVersion': 'v4',
      },
    });

    const flights = response.data.flights;
    
    // API'den gelen `link` header'ını kontrol et
    const linkHeader = response.headers.link;
    const links = parseLinkHeader(linkHeader);

    // Eğer `link` header'ında `last` varsa toplam sayfa sayısını hesapla
    const totalPages = links && links.last ? getPageFromUrl(links.last) : 0;

    // Yanıt olarak uçuşları ve toplam sayfa sayısını gönder
    res.json({
      flights,
      totalPages: totalPages ? parseInt(totalPages, 10) + 1 : 1 // Toplam sayfa sayısı
    });
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ message: 'Uçuş verileri alınırken bir hata oluştu.' });
  }
});

// Link başlığını ayrıştıran fonksiyon
function parseLinkHeader(header) {
  if (!header) return null;
  const links = {};

  header.split(',').forEach(part => {
    const section = part.split(';');
    if (section.length !== 2) return;

    const url = section[0].replace(/<(.*)>/, '$1').trim();
    const name = section[1].replace(/rel="(.*)"/, '$1').trim();
    links[name] = url;
  });

  return links;
}

// URL'den sayfa numarasını çıkaran fonksiyon
function getPageFromUrl(url) {
  const urlParams = new URLSearchParams(url.split('?')[1]);
  return urlParams.get('page');
}

module.exports = router;