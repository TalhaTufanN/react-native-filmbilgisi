# Ne İzlesek - Proje Bağlamı (Project Context)

## Proje Özeti
Ne İzlesek, React Native ve Expo kullanılarak geliştirilmiş modern bir film ve dizi bulma uygulamasıdır. The Movie Database (TMDB) API'si entegrasyonu ile filmler, diziler, oyuncular ve popüler içerikler hakkında detaylı bilgiler sunar.

## Teknoloji Yığını (Tech Stack)
- **Framework:** React Native (v0.81.5), Expo (SDK ~54)
- **UI & Stil:** Nativewind (Tailwind CSS tabanlı modern stil çözümü), React Native Paper, React Native Vector Icons, React Native Heroicons.
- **Navigasyon:** React Navigation v7 (Stack ve Drawer navigasyon birlikte kullanılıyor).
- **Veri Çekme (Data Fetching):** Axios (TMDB API istekleri için `api/moviedb.js` içerisinde yapılandırılmış).
- **Yerel Depolama (Local Storage):** `@react-native-async-storage/async-storage` (Favori filmleri ve kişileri yerel olarak kaydetmek için kullanılıyor, akıllı hafıza).
- **Animasyonlar:** React Native Reanimated, React Native Gesture Handler.

## Mimari ve Dizin Yapısı
Proje, tipik bir React Native modüler yapısına sahiptir:

- **/api:** TMDB API ile iletişim kuran Axios fonksiyonlarını ve uç noktaları barındırır (`moviedb.js`).
- **/assets:** Uygulama içi resimler, ikonlar ve ekran görüntüleri (örneğin README için).
- **/components:** Yeniden kullanılabilir UI bileşenlerini içerir.
  - `Cast.js`: Oyuncu listesini gösterir.
  - `Loading.js`: Yükleme animasyon/durum bileşeni.
  - `MovieList.js`: Genel film listeleri.
  - `TrendingMovies.js`: Trend filmler için özel karusel (carousel) bileşeni.
- **/navigation:** Uygulama içi yönlendirmelerin yapılandırıldığı alan.
  - `AppNavigation.js`: Ana yönlendirme kurgusu.
  - `CustomDrawerContent.js`: Özel tasarım yan menü (drawer) içeriği.
- **/screens:** Uygulamanın ana ekranları.
  - `HomeScreen.js`: Ana sayfa, trendler ve kategoriler.
  - `MovieScreen.js`: Seçilen filmin detay sayfası.
  - `PersonScreen.js`: Oyuncu detay ve biyografi sayfası.
  - `FavouritesScreen.js`: AsyncStorage'a kaydedilmiş favori film ve dizilerin listelendiği ekran.
  - `ProfileScreen.js`: Kullanıcı profili ve istatistikleri.
  - `SearchScreen.js`: TMDB arama motoru entegrasyonlu detaylı arama sayfası.
  - `SettingsScreen.js`: Uygulama ayarları.
  - `SeeAllScreen.js`: Kategorilerdeki tüm filmleri listeleyen ekran.
- **/theme:** Renk paletleri ve global tema ayarlarının tutulduğu yapı.

## Öne Çıkan Özellikler
1. **Keşfet:** Vizyondaki, popüler ve trend filmleri anlık görüntüleme.
2. **Oyuncu Bilgileri:** Film detaylarından oyuncu profillerine, oradan da oyuncunun diğer filmlerine geçiş yapabilme.
3. **Akıllı Favoriler:** `AsyncStorage` ile cihaz üzerinde çalışan, internet veya sunucu gerektirmeyen favorileme sistemi.
4. **Modern UI/UX:** TailwindCSS destekli `Nativewind` ile karanlık tema (Dark Mode) ağırlıklı estetik tasarım ve akıcı animasyonlar.

## Çevresel Değişkenler (Environment Variables)
Uygulama, API anahtarlarını güvende tutmak için `.env` (dotenv) üzerinden yapılandırma kullanmaktadır. TMDB Access Token veya API Key gibi bilgiler `api/moviedb.js` veya bu dosya etrafında `.env` içerisinden okunur.
