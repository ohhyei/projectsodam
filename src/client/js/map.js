const mapCategory = document.querySelectorAll('.mapCategory');

let all = [],    
    markers = [];

// 지도를 담을 영역의 DOM 레퍼런스
const mapContainer = document.getElementById('map');

// 지도를 생성할 때 필요한 기본 옵션
const mapOptions = {
    level: 9, //지도의 레벨(확대, 축소 정도)
    center: new kakao.maps.LatLng(35.87170628445063, 128.60152645767263), //지도의 중심좌표.
};

// 지도 생성 및 객체 리턴
var map = new kakao.maps.Map(mapContainer, mapOptions);

// 내 위치
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        // 마커를 표시합니다
        displayMarker(locPosition);
    });
    
} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치를 설정합니다
    var locPosition = new kakao.maps.LatLng(35.87170628445063, 128.60152645767263);
    displayMarker(locPosition);
}

var myImageSrc = '/file/img/myMappin.png', // 마커이미지의 주소입니다    
    myImageSize = new kakao.maps.Size(48, 48), // 마커이미지의 크기입니다
    myImageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      
// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var myMarkerImage = new kakao.maps.MarkerImage(myImageSrc, myImageSize, myImageOption);

// 지도에 마커를 표시하는 함수입니다
function displayMarker(locPosition) {

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({  
        map: map, 
        position: locPosition,
        image: myMarkerImage
    });
    
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);      
}

// fetch() 함수로 DB의 데이터 불러오기
const mapFetch = async () => {
    var data = await(await fetch("/map/info")).json();
    console.log(data)

    for(i=0; i < data.length; i++) {
        // 마커가 표시될 위치
        let markerPosition = new kakao.maps.LatLng(data[i].latitude, data[i].longitude);

        // 이미지 주소
        let imgSrc = "/file/img/mappin.png";
        // 이미지 크기
        let imgSize = new kakao.maps.Size(22, 32);
        // 마커 이미지
        let markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

        // 마커 생성
        var marker = new kakao.maps.Marker({
            map: map, 
            position: markerPosition,
            image: markerImage
        });
    }

    // 카테고리 눌렀을 때 메뉴 스타일 변경
    const menuStyleChange = (clickDom) => {
        for(let i=0; i < mapCategory.length; i++) {
            if(mapCategory[i] === clickDom) mapCategory[i].classList.add("mapCategoryOn")
            else mapCategory[i].classList.remove("mapCategoryOn")
        }
    }

    // 카테고리 눌렀을 때 실행할 함수
    const clickMenu = (e) => {
        const clickDom = e.currentTarget;
        if(clickDom.classList.contains("mapCategoryOn")) return;
        menuStyleChange(clickDom);
    }

    // 카테고리 클릭 이벤트
    for(let i=0; i < mapCategory.length; i++) {
        mapCategory[i].addEventListener("click", clickMenu);
    }
}
mapFetch();