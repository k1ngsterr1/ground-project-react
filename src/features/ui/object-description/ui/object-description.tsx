export const ObjectDescription = () => {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <h2 className="font-semibold text-lg">Описание:</h2>
      <div className="space-y-2 text-[#2f2f2f]/70">
        <p>
          Участок 5 соток (СТ) в г. Севастополь, Гагаринский район, рядом с СТ
          "Ямал". Участок трапециевидной формы со сторонами 28м*21м*23м*19м.
          Рядом хвойный лес.
        </p>
        <p>Подъездные пути хорошие, широкие.</p>
        <p>Коммуникации:</p>
        <p>Электричество - 15 кВт подключено;</p>
        <p>Вода - делать скважину;</p>
        <p>Канализация - потребуется септик.</p>
      </div>
      <button className="text-[#00a859] font-medium">Читать подробнее</button>
    </div>
  );
};
