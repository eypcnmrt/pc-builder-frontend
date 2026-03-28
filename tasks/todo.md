# Frontend Revision Plan

## Phase 1 — Critical (Kod Kalitesi)

### 1.1 Error Handling
- [ ] `service/instance.ts` — null döndürmek yerine typed error response
- [ ] `useLogin.ts`, `useRegister.ts` — kullanıcıya hata nedeni iletilsin
- [ ] Axios interceptor'a 401 redirect ekle (token expire → login)

### 1.2 Filter Hook Duplikasyonu
- [ ] `utils/useFilter.ts` generic filter hook oluştur
- [ ] `useCaseSelect.ts` — ortak hook'a geçir
- [ ] `useCoolerSelect.ts` — ortak hook'a geçir
- [ ] `useGpuSelect.ts` — ortak hook'a geçir
- [ ] `usePsuSelect.ts` — ortak hook'a geçir
- [ ] `useRamSelect.ts` — ortak hook'a geçir
- [ ] `useStorageSelect.ts` — ortak hook'a geçir

### 1.3 Null State Sorunu
- [ ] Tüm `useState<XFilters | null>` → gerçek default değerle initialize et
- [ ] Gereksiz null check'leri kaldır

## Phase 2 — High (Tutarlılık)

### 2.1 Naming Normalizasyonu
- [ ] Tüm hook metodları `handle*` prefix ile standardize et
- [ ] Service fonksiyonları `fetch*` → `get*` olarak standardize et

### 2.2 Dead Code Temizliği
- [ ] `global.d.ts` — kullanılmayan `Window.changeHeaderTitle` sil
- [ ] `service/gpu.ts`, `cooler.ts`, vb. — kullanılmayan `fetchById` fonksiyonları sil

## Phase 3 — Medium (Güvenlik & Performans)
- [ ] `utils/token.ts` null check'lerini tutarlı hale getir
- [ ] `buildState.ts` JSON parse güvenli hale getir
- [ ] Unused imports temizle

---
## Review
_Uygulama sonrası buraya eklenecek_
