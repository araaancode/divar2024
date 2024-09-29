var mongoose = require("mongoose");

module.exports = {
  ObjectId: mongoose.Schema.Types.ObjectId,
  MONGO_URL:
    "mongodb://divar:123456@localhost:20000/divar",
  MONGO_CONFIG_JSON: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  MONGO_SCHEMA_CONFIG_JSON: {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
    },
    toObject: {
      getters: true,
      virtuals: true,
    },
  },
  USER_PANEL_SIDE_BAR: [
    {
      name: "داشبورد",
      icon: "icon-dashboard",
      url: "/userPanel",
      count: "",
    },
    {
      name: "اگهی های من",
      icon: "icon-newspaper-o",
      url: "/userPanel/ads",
      count: 0,
    },
    {
      name: "اضافه کردن آگهی",
      icon: "icon-plus",
      url: "/userPanel/create-ads",
      count: "",
    },
  ],
  ADMIN_PANEL_ACCESS: [
    {
      name: "ادمین ها",
      slug: "admins",
    },
    {
      name: "کاربران",
      slug: "users",
    },
  ],
  ADMIN_PANEL_ACCESS_TYPE: [
    {
      name: "دسترسی کامل",
      slug: "administrator",
    },
    {
      name: "فقط خواندنی",
      slug: "readonly",
    },
  ],
  ADMIN_PANEL_SIDE_BAR: [
    {
      name: "داشبورد",
      icon: "icon-dashboard",
      url: "/adminPanel",
      slug: "dashboard",
    },
    {
      name: "ادمین ها",
      icon: "icon-user-secret",
      slug: "admins",
      url: "/adminPanel/admins",
    },
    {
      name: "کاربران",
      icon: "icon-users",
      slug: "users",
      url: "/adminPanel/users",
    },
    {
      name: "آگهی ها",
      icon: "icon-newspaper-o",
      slug: "ads",
      url: "/adminPanel/ads",
    },
  ],
  DATA_TABLE_LANGUAGE: {
    sEmptyTable: "هیچ داده‌ای در جدول وجود ندارد",
    sInfo: "نمایش _START_ تا _END_ از _TOTAL_ ردیف",
    sInfoEmpty: "نمایش 0 تا 0 از 0 ردیف",
    sInfoFiltered: "(فیلتر شده از _MAX_ ردیف)",
    sInfoPostFix: "",
    sInfoThousands: ",",
    sLengthMenu: "نمایش _MENU_ ردیف",
    sLoadingRecords: "در حال بارگزاری...",
    sProcessing: "در حال پردازش...",
    sSearch: "جستجو:",
    sZeroRecords: "رکوردی با این مشخصات پیدا نشد",
    oPaginate: {
      sFirst: "برگه‌ی نخست",
      sLast: "برگه‌ی آخر",
      sNext: "بعدی",
      sPrevious: "قبلی",
    },
    oAria: {
      sSortAscending: ": فعال سازی نمایش به صورت صعودی",
      sSortDescending: ": فعال سازی نمایش به صورت نزولی",
    },
  },
};
