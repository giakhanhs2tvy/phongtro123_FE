export const path = {
    HOME: '/*',
    LOGIN: '/login',
    CHO_THUE_CAN_HO: 'cho-thue-can-ho',
    CHO_THUE_MAT_BANG: 'cho-thue-mat-bang',
    NHA_CHO_THUE: 'nha-cho-thue',
    CHO_THUE_PHONG_TRO: 'cho-thue-phong-tro',
    SEARCH :'tim-kiem',
    SYSTEM :'/he-thong/*',
    CREATE_POST : 'tao-moi-bai-dang',
    MANAGE_POST : 'quan-ly-bai-dang',
    EDIT_ACCOUNT :  'sua-thong-tin-ca-nhan'
};
export const formatVietnameseToString = (keyword) => {
    return keyword
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-")
}
export const text = {
    HOME_TITLE: 'Kênh thông tin Phòng Trọ số 1 Việt Nam',
    HOME_DESCRIPTION: "Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng."
}

export const location = [
    {
        id: 'hcm',
        name: 'Phòng trọ Hồ Chí Minh',
        image: 'https://phongtro123.com/images/location_hcm.jpg'
    },
    {
        name: 'Phòng trọ Hà Nội',
        image: 'https://phongtro123.com/images/location_hn.jpg',
        id: 'hn',
    },
    {
        name: 'Phòng trọ Đà nẵng',
        image: 'https://phongtro123.com/images/location_dn.jpg',
        id: 'dn',
    },
]
export const prices = {
    pricesL :[
        {value:'Dưới 1 triệu',filterType:'byPrice'}, 
        {value:'Từ 2-3 triệu',filterType:'byPrice'}, 
        {value:'Từ 5-7 triệu',filterType:'byPrice'},
        {value:'Từ 10-15 triệu',filterType:'byPrice'}
    ],
     pricesR :[
      {value:'Từ 1-2 triệu',filterType:'byPrice'}, 
      {value:'Từ 3-5 triệu',filterType:'byPrice'}, 
      {value:'Từ 7-10 triệu',filterType:'byPrice'},
      {value:'Trên 15 triệu',filterType:'byPrice'},
    ]
}
export const acreages = {
    acreagesL :[
        {value:'Dưới 20 m2',filterType:'byArea'}, 
        {value:'Từ 30 - 50 m2',filterType:'byArea'}, 
        {value:'Từ 70 - 90 m2',filterType:'byArea'}
    ],
    acreagesR :[
      {value:'Từ 20-30 m2',filterType:'byArea'}, 
      {value:'Từ 50-70 m2',filterType:'byArea'}, 
      {value:'Trên 90 m2',filterType:'byArea'}
    ]
}
