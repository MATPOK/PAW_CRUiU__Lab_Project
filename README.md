
PROJEKT: Centralny Rejestr Urządzeń i Użytkowników
DOKUMENTACJA TECHNICZNA I UŻYTKOWA


1. WPROWADZENIE
--------------------------------------------------------------------------------
[KRÓTKI OPIS]
CRUiU to nowoczesna aplikacja webowa typu Fullstack realizująca
funkcjonalności CRUD (Create, Read, Update, Delete). System służy do cyfrowej
ewidencji sprzętu komputerowego, pracowników oraz struktury organizacyjnej
przedsiębiorstwa.

[CEL APLIKACJI]
Celem projektu jest rozwiązanie problemów związanych z ręcznym zarządzaniem
inwentarzem (np. w arkuszach Excel) poprzez dostarczenie scentralizowanej,
spójnej bazy danych dostępnej przez przeglądarkę. Aplikacja automatyzuje
proces przypisywania sprzętu do pracowników oraz monitoruje stan magazynowy.

[KLUCZOWE FUNKCJE]
- Ewidencja: Zarządzanie bazą urządzeń, pracowników i działów.
- Relacje: Przypisywanie sprzętu do konkretnych osób.
- Analityka: Dashboard prezentujący wartość majątku i stany magazynowe.
- Automatyzacja: Generator danych testowych (Seeding) wypełniający bazę.


2. WYKORZYSTANE TECHNOLOGIE
--------------------------------------------------------------------------------
Projekt zrealizowano w architekturze mikroserwisowej z wykorzystaniem
konteneryzacji Docker.

BACKEND:
- Node.js (v20+)
- NestJS (Framework modułowy)
- Prisma ORM (Obsługa bazy danych)
- Swagger (Dokumentacja API)

FRONTEND:
- React 18 + Vite
- Material UI (Biblioteka komponentów)
- Axios (Komunikacja HTTP)
- React Hook Form + Zod (Walidacja formularzy)

BAZA DANYCH I NARZĘDZIA:
- PostgreSQL 15 (Relacyjna baza danych)
- Docker & Docker Compose
- Git
- Adminer (Klient SQL)


3. WPROWADZENIE (INSTALACJA)
--------------------------------------------------------------------------------
[WYMAGANIA WSTĘPNE]
Aby uruchomić projekt, musisz posiadać zainstalowane:
- Docker Desktop (wraz z Docker Compose)
- Git

[KLONOWANIE REPOZYTORIUM]
W terminalu wykonaj komendę:
> git clone https://github.com/MATPOK/PAW_CRUiU__Lab_Project
> cd PAW_CRUiU__Lab_Project

[KROKI INSTALACJI]
Instalacja jest w pełni zautomatyzowana dzięki Dockerowi.

1. Upewnij się, że Docker jest uruchomiony.
2. W folderze głównym projektu uruchom:
   > docker-compose up --build

3. Poczekaj na start kontenerów. Skrypt startowy automatycznie:
   - Utworzy bazę danych.
   - Wykona migracje tabel.
   - Wypełni bazę danymi testowymi (100 urządzeń, 50 pracowników).


4. INSTRUKCJE UŻYTKOWANIA
--------------------------------------------------------------------------------
Po uruchomieniu środowiska, aplikacja dostępna jest pod poniższymi adresami:

Aplikacja (Frontend):     http://localhost:5173
API (Backend):            http://localhost:3000
Dokumentacja (Swagger):   http://localhost:3000/api
Baza danych (Adminer):    http://localhost:8080
(Dane do Adminera: Serwer: db, User: user, Hasło: password123, Baza: cruiu_db)

[ZRZUTY EKRANU]
Pliki graficzne znajdują się w folderze /docs w repozytorium:
- docs/dashboard.png (Widok statystyk)
- docs/list.png (Widok tabeli urządzeń)
- docs/form.png (Widok formularza dodawania)


5. KOD I KONFIGURACJA
--------------------------------------------------------------------------------
[REPOZYTORIUM]
Link: https://github.com/MATPOK/PAW_CRUiU__Lab_Project

[PRZYKŁADOWA KONFIGURACJA]
Główna konfiguracja znajduje się w pliku 'docker-compose.yml'.

Przykład zmiennych środowiskowych (.env) dla Backendu:
DATABASE_URL="postgresql://user:password123@db:5432/cruiu_db?schema=public"

Konfiguracja Docker Compose:
Usługa 'backend' posiada zdefiniowaną komendę startową:
command: /bin/sh -c "npx prisma migrate deploy && npx prisma db seed && npm run start:dev"

Dzięki temu baza danych jest zawsze aktualna i wypełniona danymi przy starcie.


6. FUNKCJE
--------------------------------------------------------------------------------
GŁÓWNE:
1. CRUD: Pełne zarządzanie zasobami (Dodawanie, Edycja, Usuwanie, Podgląd).
2. Dashboard: Wizualizacja KPI (wartość sprzętu, liczba wakatów).
3. Inteligentne listy: Formularze dynamicznie pobierają działy/pracowników.

UNIKALNE / ZAAWANSOWANE:
- Global Exception Filter: Backend przechwytuje błędy i zwraca je jako JSON.
- Paginacja API: Endpointy obsługują parametry limit/page i zwracają metadane.
- Seeding: Zaawansowany skrypt generujący realistyczne dane biznesowe.
- Walidacja DTO: Automatyczna weryfikacja typów danych na wejściu.


7. STRUKTURA KODU
--------------------------------------------------------------------------------
[MODEL DANYCH]
Relacje w bazie PostgreSQL:
- Department (1) <---> (N) Employee
- Employee   (1) <---> (N) Device

[STRUKTURA KATALOGÓW]
/backend
  /src
    /departments  (Logika dla działów)
    /devices      (Logika dla urządzeń)
    /employees    (Logika dla pracowników)
    /prisma       (Pliki bazy danych: schema i seed)
/frontend
  /src
    /components   (Komponenty UI: Modale, Formularze)
    /views        (Widoki stron)
    /services     (Klient API - Axios)

[PREZENTACJA KODU - PRZYKŁAD DODAWANIA URZĄDZENIA]

A. Walidacja (Backend DTO - create-device.dto.ts):
   export class CreateDeviceDto {
     @IsString()
     serialNumber: string;
     @IsNumber() @Min(0)
     price: number;
   }

B. Logika Biznesowa (Backend Service - devices.service.ts):
   create(dto: CreateDeviceDto) {
     return this.prisma.device.create({ data: dto });
   }

C. Formularz (Frontend - React + Zod):
   const schema = z.object({
     serialNumber: z.string().min(3),
     price: z.coerce.number().min(0.01)
   });


8. WDROŻENIE
--------------------------------------------------------------------------------
Aplikacja jest przystosowana do wdrożenia kontenerowego na serwerze Linux.

KROKI KONFIGURACJI PRODUKCYJNEJ:
1. Przygotowanie: Zainstaluj Docker Engine i Docker Compose na serwerze (VPS).
2. Pobranie kodu: Sklonuj repozytorium (git clone).
3. Bezpieczeństwo: Utwórz plik .env z silnymi, unikalnymi hasłami.
4. Uruchomienie:
   Użyj komendy: docker-compose up -d --build
5. Proxy (Opcjonalnie):
   Skonfiguruj Nginx jako Reverse Proxy przekierowujący ruch z portu 80
   na porty kontenerów (Frontend: 5173, Backend: 3000).


Autorzy dokumentacji: Mateusz Pokrywka, Maciej Pereślucha
Data: 19.01.2026
