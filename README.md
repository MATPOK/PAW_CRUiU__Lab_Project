DOKUMENTACJA PROJEKTOWA: Centralny Rejestr Urządzeń i Użytkowników
================================================================

------------------------------------------------------------

WPROWADZENIE
------------

[KRÓTKI OPIS]

Aplikacja stworzona na potrzeby projektu studenckiego wraz z @sluchson.
CRUiU to nowoczesna aplikacja webowa typu Fullstack realizująca
funkcjonalności CRUD (Create, Read, Update, Delete).

System służy do cyfrowej ewidencji sprzętu komputerowego, pracowników
oraz struktury organizacyjnej przedsiębiorstwa.

------------------------------------------------------------

[CEL APLIKACJI]

Celem projektu jest rozwiązanie problemów związanych z ręcznym zarządzaniem
inwentarzem (np. w arkuszach Excel) poprzez dostarczenie scentralizowanej,
spójnej bazy danych dostępnej przez przeglądarkę.

Aplikacja automatyzuje proces przypisywania sprzętu do pracowników
oraz monitoruje stan magazynowy.

------------------------------------------------------------

[KLUCZOWE FUNKCJE]

- Ewidencja: Zarządzanie bazą urządzeń, pracowników i działów
- Relacje: Przypisywanie sprzętu do konkretnych osób
- Analityka: Dashboard prezentujący wartość majątku i stany magazynowe
- Automatyzacja: Generator danych testowych (Seeding) wypełniający bazę

------------------------------------------------------------

WYKORZYSTANE TECHNOLOGIE
-----------------------

Projekt zrealizowano w architekturze mikroserwisowej
z wykorzystaniem konteneryzacji Docker.

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

------------------------------------------------------------

WPROWADZENIE (INSTALACJA)
------------------------

[WYMAGANIA WSTĘPNE]

Aby uruchomić projekt, musisz posiadać zainstalowane:
- Docker Desktop (wraz z Docker Compose)
- Git

------------------------------------------------------------

[KLONOWANIE REPOZYTORIUM]

W terminalu wykonaj komendy:

```
git clone https://github.com/MATPOK/PAW_CRUiU__Lab_Project
cd PAW_CRUiU__Lab_Project
```

------------------------------------------------------------

[KROKI INSTALACJI]

Instalacja jest w pełni zautomatyzowana dzięki Dockerowi.

1. Upewnij się, że Docker jest uruchomiony.
2. W folderze głównym projektu uruchom:
```
   docker-compose up --build
   ```
3. Poczekaj na start kontenerów. 

Skrypt startowy automatycznie:
   - Utworzy bazę danych
   - Wykona migracje tabel
   - Wypełni bazę danymi testowymi
     (100 urządzeń, 50 pracowników)

------------------------------------------------------------

INSTRUKCJE UŻYTKOWANIA
---------------------

Po uruchomieniu środowiska aplikacja dostępna jest pod adresami:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Swagger: http://localhost:3000/api
- Adminer: http://localhost:8080

------------------------------------------------------------

[ZRZUTY EKRANU]

Pliki graficzne znajdują się w folderze /docs w repozytorium:

- docs/dashboard.png – Widok statystyk
- docs/list.png – Widok tabeli urządzeń
- docs/form.png – Widok formularza dodawania

------------------------------------------------------------

KOD I KONFIGURACJA
-----------------

[REPOZYTORIUM]

Link:
https://github.com/MATPOK/PAW_CRUiU__Lab_Project

------------------------------------------------------------

[PRZYKŁADOWA KONFIGURACJA]

Główna konfiguracja znajduje się w pliku docker-compose.yml.

Przykład zmiennych środowiskowych (.env) dla Backendu:

DATABASE_URL="postgresql://user:password123@db:5432/cruiu_db?schema=public"

Komenda startowa usługi backend:

/bin/sh -c "npx prisma migrate deploy &&
npx prisma db seed &&
npm run start:dev"

Dzięki temu baza danych jest zawsze aktualna
i wypełniona danymi przy starcie.

------------------------------------------------------------

FUNKCJE
-------

GŁÓWNE:
1. CRUD – Pełne zarządzanie zasobami
2. Dashboard – Wizualizacja KPI
3. Inteligentne listy – Dynamiczne formularze

UNIKALNE / ZAAWANSOWANE:
- Global Exception Filter – Błędy zwracane jako JSON
- Paginacja API – Obsługa limit/page
- Seeding – Realistyczne dane testowe
- Walidacja DTO – Automatyczna walidacja danych

------------------------------------------------------------

STRUKTURA KODU
-------------

[MODEL DANYCH]

Relacje w bazie PostgreSQL:
- Department (1) <-> (N) Employee
- Employee (1) <-> (N) Device

------------------------------------------------------------

[STRUKTURA KATALOGÓW]


- /backend
    - /src
        - /departments   (Logika działów)
        - /devices       (Logika urządzeń)
        - /employees     (Logika pracowników)
        - /prisma        (Schema i seeding)

- /frontend
    - /src
        - /components    (Komponenty UI)
        - /views         (Widoki)
        - /services      (Axios API)

------------------------------------------------------------

[PREZENTACJA KODU – PRZYKŁAD DODAWANIA URZĄDZENIA]

A. Walidacja (Backend DTO):
```
export class CreateDeviceDto {
  @IsString()
  serialNumber: string;

  @IsNumber()
  @Min(0)
  price: number;
}
```
B. Logika biznesowa (Service):
```
create(dto: CreateDeviceDto) {
  return this.prisma.device.create({ data: dto });
}
```
C. Formularz (Frontend):
```
const schema = z.object({
  serialNumber: z.string().min(3),
  price: z.coerce.number().min(0.01)
});
```
------------------------------------------------------------

WDROŻENIE
--------

Aplikacja przystosowana do wdrożenia kontenerowego na serwerze Linux.

KROKI KONFIGURACJI PRODUKCYJNEJ:
1. Zainstaluj Docker Engine i Docker Compose
2. Sklonuj repozytorium
3. Utwórz plik .env z silnymi hasłami
4. Uruchom:
   docker-compose up -d --build
5. (Opcjonalnie) Skonfiguruj Nginx jako Reverse Proxy
   - Frontend: 5173
   - Backend: 3000

------------------------------------------------------------

Autorzy dokumentacji:
Mateusz Pokrywka (@MATPOK)
Maciej Pereślucha (@sluchson)

Data: 19.01.2026
