import React from "react";
import "./footer.css";

const Footer = () => {
   const changeDisplay = (id: string) => {
      const ul = document.getElementById(id) as HTMLUListElement;
      ul.style.display === ""
         ? (ul.style.display = "block")
         : (ul.style.display = "");
   };
   return (
      <div className="footer">
         <div className="footer-container">
            <div
               className="footer-list-container"
               onClick={() => changeDisplay("list-contact")}
            >
               <h1 className="list-header">kontakt z mbankiem</h1>
               <ul id="list-contact">
                  <li className="list-item">Centrum kontaktu</li>
                  <li className="list-item">
                     Placówki, bankomaty i wpłatomaty
                  </li>
                  <li className="list-item">Obsługa osób niepełnosprawnych</li>
                  <li className="list-item">Problem ze spłatą</li>
                  <li className="list-item">Reklamacje</li>
                  <li className="list-item">Biuro prasowe</li>
                  <li className="list-item">Zajęcie egzekucyjne</li>
               </ul>
            </div>
            <div
               className="footer-list-container"
               onClick={() => changeDisplay("list-help")}
            >
               <h1 className="list-header">pomoc</h1>
               <ul id="list-help">
                  <li className="list-item">Godziny sesji przelewów</li>
                  <li className="list-item">Zastrzeganie kart</li>
                  <li className="list-item">Opłaty i prowizje</li>
                  <li className="list-item">Oprocentowanie</li>
                  <li className="list-item">Regulaminy i dokumenty</li>
               </ul>
            </div>
            <div
               className="footer-list-container"
               onClick={() => changeDisplay("list-security")}
            >
               <h1 className="list-header">bezpieczeństwo i prawo</h1>
               <ul id="list-security">
                  <li className="list-item">Ludzie są niesamowici</li>
                  <li className="list-item">Bezpieczeństwo</li>
                  <li className="list-item">Polityka cookie</li>
                  <li className="list-item">Ustawienia cookie</li>
                  <li className="list-item">Gwarancja depozytów</li>
                  <li className="list-item">Informacje prawne</li>
               </ul>
            </div>
            <div
               className="footer-list-container"
               onClick={() => changeDisplay("list-about")}
            >
               <h1 className="list-header">o nas</h1>
               <ul id="list-about">
                  <li className="list-item">O mBanku</li>
                  <li className="list-item">Relacje inwestorskie</li>
                  <li className="list-item">Notowanie i kursy walut</li>
                  <li className="list-item">Serwis ekonomiczny</li>
                  <li className="list-item">Grupa mBanku</li>
                  <li className="list-item">Kariera w mBanku</li>
                  <li className="list-item">mFundacja</li>
               </ul>
            </div>
            <div
               className="footer-list-container"
               onClick={() => changeDisplay("list-links")}
            >
               <h1 className="list-header">przydatne linki</h1>
               <ul id="list-links">
                  <li className="list-item">Aplikacja mobilna</li>
                  <li className="list-item">Program partnerski</li>
                  <li className="list-item">Zaostań pośrednikiem</li>
                  <li className="list-item">Polecam mBank</li>
                  <li className="list-item">mOkazje</li>
                  <li className="list-item">English version</li>
                  <li className="list-item">Kompakt Finanse</li>
               </ul>
            </div>
            <div
               className="footer-list-container"
               onClick={() => changeDisplay("list-products")}
            >
               <h1 className="list-header">produkty</h1>
               <ul id="list-products">
                  <li className="list-item">Konta osobiste</li>
                  <li className="list-item">Konta firmowe</li>
                  <li className="list-item">Konta oszczędnościowe</li>
                  <li className="list-item">Fundusze inwestycyjne</li>
                  <li className="list-item">Kredyty hipoteczne</li>
                  <li className="list-item">Kredyty gotówkowe</li>
                  <li className="list-item">Karty kredytowe</li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Footer;
