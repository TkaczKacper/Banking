import React from "react";
import './footer.css';

const Footer = () => {
     return (
          <div className="footer">

               <div className="footer-container">
                    <div className="footer-list-container">
                         <h1 className="list-header">kontakt z mbankiem</h1>
                         <ul>
                              <li>Centrum kontaktu</li>
                              <li>Placówki, bankomaty i wpłatomaty</li>
                              <li>Obsługa osób niepełnosprawnych</li>
                              <li>Problem ze spłatą</li>
                              <li>Reklamacje</li>
                              <li>Biuro prasowe</li>
                              <li>Zajęcie egzekucyjne</li>
                         </ul>
                    </div>
                    <div className="footer-list-container">
                         <h1 className="list-header">pomoc</h1>
                         <ul>
                              <li>Godziny sesji przelewów</li>
                              <li>Zastrzeganie kart</li>
                              <li>Opłaty i prowizje</li>
                              <li>Oprocentowanie</li>
                              <li>Regulaminy i dokumenty</li>
                         </ul>
                    </div>
                    <div className="footer-list-container">
                         <h1 className="list-header">bezpieczeństwo i prawo</h1>
                         <ul>
                              <li>Ludzie są niesamowici</li>
                              <li>Bezpieczeństwo</li>
                              <li>Polityka cookie</li>
                              <li>Ustawienia cookie</li>
                              <li>Gwarancja depozytów</li>
                              <li>Informacje prawne</li>
                         </ul>
                    </div>
                    <div className="footer-list-container">
                         <h1 className="list-header">o nas</h1>
                         <ul>
                              <li>O mBanku</li>
                              <li>Relacje inwestorskie</li>
                              <li>Notowanie i kursy walut</li>
                              <li>Serwis ekonomiczny</li>
                              <li>Grupa mBanku</li>
                              <li>Kariera w mBanku</li>
                              <li>mFundacja</li>
                         </ul>
                    </div>
                    <div className="footer-list-container">
                         <h1 className="list-header">przydatne linki</h1>
                         <ul>
                              <li>Aplikacja mobilna</li>
                              <li>Program partnerski</li>
                              <li>Zaostań pośrednikiem</li>
                              <li>Polecam mBank</li>
                              <li>mOkazje</li>
                              <li>English version</li>
                              <li>Kompakt Finanse</li>
                         </ul>
                    </div>
                    <div className="footer-list-container">
                         <h1 className="list-header">produkty</h1>
                         <ul>
                              <li>Konta osobiste</li>
                              <li>Konta firmowe</li>
                              <li>Konta oszczędnościowe</li>
                              <li>Fundusze inwestycyjne</li>
                              <li>Kredyty hipoteczne</li>
                              <li>Kredyty gotówkowe</li>
                              <li>Karty kredytowe</li>
                         </ul>
                    </div>
               </div>
          </div>
     );
};

export default Footer;
