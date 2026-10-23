export const leads = [
  {
    id: "mock-lead-1",
    num: 1024,
    status: "add_driver",
    customer: { id: "mock-customer-1", name: "ТОО Торговый дом" },
    driver: { fio: "Иван Петров" },
    from_location: { city: "Алматы", address: "Алматы, ул. Абая, 10" },
    to_location: { city: "Астана", address: "Астана, пр. Мангилик Ел, 55" },
  },
  {
    id: "mock-lead-2",
    num: 1023,
    status: "start_loading",
    customer: { id: "mock-customer-2", name: "ТОО Стройматериалы" },
    driver: { fio: "Алексей Иванов" },
    from_location: { city: "Шымкент", address: "Шымкент, ул. Тауке хана, 25" },
    to_location: { city: "Алматы", address: "Алматы, ул. Рыскулова, 80" },
  },
  {
    id: "mock-lead-3",
    num: 1022,
    status: "finished",
    customer: { id: "mock-customer-1", name: "ТОО Торговый дом" },
    driver: { fio: "Дмитрий Смирнов" },
    from_location: { city: "Караганда", address: "Караганда, ул. Складская, 12" },
    to_location: { city: "Астана", address: "Астана, ул. Сауран, 7" },
  },
];
