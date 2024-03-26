import "./guarantee.scss";

const Guarantee = () => {
  return (
    <div className="wrapper">
      <div className="guarantee">
        <h2 className="guarantee_title">
          Як здати товар на гарантійний ремонт?
        </h2>
        <h3 className="guarantee_subtitle">
          Ви можете здати товар на ремонт самостійно у сервісному центрі,
          передати у нашому магазині чи надіслати поштовим оператором.
        </h3>
        <ul className="guarantee_lists">
          <li className="guarantee_list">
            Тут можна знайти повний перелік сервісних центрів, до яких ви можете
            самостійно звернутися за гарантійним обслуговуванням.
          </li>
          <li className="guarantee_list">
            Якщо у вашому населеному пункті немає сервісного центру, ви можете
            надати товар для гарантійного ремонту нам. А ми передамо його до
            авторизованого сервісного центру. Передати товар на ремонт можна у
            сервісних відділах або пунктах прийому повернень у наших магазинах.
          </li>
          <li className="guarantee_list">
            Якщо у вашому місті немає наших представництв, надішліть товар
            «Новою поштою» або Meest разом із заповненою в особистому кабінеті
            заявкою на гарантійне обслуговування. Разом із товаром вкладіть
            гарантійний талон. Якщо ви його втратили, не хвилюйтеся, його легко
            відновити. Як це зробити, читайте тут. Коли надсилаєте товар
            кур’єрською службою, оформте відправлення за реквізитами:
            <span className="guarantee_sublist">
              Отримувач - ТОВ «Термінал iGadget Hub», сервіс
            </span>
            <span className="guarantee_sublist">код ЄДРПОУ - 33584049</span>
            <span className="guarantee_sublist">
              Телефон - (044) 364-83-65 (лише як контактний для відправки)
            </span>
            Телефон - (044) 364-83-65 (лише як контактний для відправки)
            <span className="guarantee_sublist">Вид доставки - склад-двері</span>
            <span className="guarantee_sublist">
              Адреса- м. Бровари, Броварська об’їзна дорога, 62
            </span>
            <span className="guarantee_sublist">
              Оплата доставки - коштом відправника
            </span>
            <span className="guarantee_sublist">
              Id договору - ZPS39234, потрібно вказувати тільки для Meest
            </span>
            <span className="guarantee_sublist">
              Послуги «Зворотна доставка» і «Післяплата» треба скасувати.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Guarantee;
