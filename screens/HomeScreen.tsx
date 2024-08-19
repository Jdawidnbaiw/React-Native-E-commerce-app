import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Platform, Pressable, ScrollView, TextInput, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import { SliderBox } from 'react-native-image-slider-box';
import ProductItem from './ProductItem';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import Entypo from "react-native-vector-icons/Entypo";
let SQLite = require('react-native-sqlite-storage');
import { BottomModal, SlideAnimation, ModalContent } from 'react-native-modals';

const db = SQLite.openDatabase(
  {
    name: 'products3.0.sqlite',
    createFromLocation: '~products3.0.sqlite', // This indicates to look for the products.sqlite in the main assets folder
  },
  () => console.log('Database opened successfully.'),
  (error: any) => console.error('Error opening database:', error)
);


const HomeScreen = () => {


  const list = [
    {
      id: 0,
      image: "https://travelifestaybetter.com/wp-content/uploads/2022/02/set-of-contemporary-house-appliances-isolated-on-white-picture-id1174598609.jpg",
      name: "Home",
    },
    {
      id: 1,
      image: "https://magento.senq.com.my/media/wysiwyg/m2_images/m2_cms/montly-promo/2024/april/SQ_Apr_Category_Fair_Home-eSIS-Inpage-Banner-D-1920x500.jpg",
      name: "Deals",
    },
    {
      id: 3,
      image: "https://www.senq.com.my/_next/image?url=https%3A%2F%2Fthumbor.sirclocdn.xyz%2Funsafe%2F240x300%2Ffilters%3Aformat(webp)%2Fhttps%3A%2F%2Fmagento.senq.com.my%2Fmedia%2Fcatalog%2Fproduct%2Fx%2F9%2Fx90l-01.jpg%3Fquality%3D80%26bg-color%3D255%2C255%2C255%26fit%3Dbounds%26height%3D%26width%3D&w=256&q=80",
      name: "TV",
    },
    {
      id: 4,
      image: "https://www.senq.com.my/_next/image?url=https%3A%2F%2Fthumbor.sirclocdn.xyz%2Funsafe%2F240x300%2Ffilters%3Aformat(webp)%2Fhttps%3A%2F%2Fmagento.senq.com.my%2Fmedia%2Fcatalog%2Fproduct%2Fi%2Fp%2Fiphone-11-black-64gb-128gb-senheng.jpg%3Fquality%3D80%26bg-color%3D255%2C255%2C255%26fit%3Dbounds%26height%3D%26width%3D&w=256&q=80",
      name: "Mobiles",
    },
    {
      id: 5,
      image: "https://www.senq.com.my/_next/image?url=https%3A%2F%2Fthumbor.sirclocdn.xyz%2Funsafe%2F240x300%2Ffilters%3Aformat(webp)%2Fhttps%3A%2F%2Fmagento.senq.com.my%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fc%2Fsc-ux100.jpg%3Fquality%3D80%26bg-color%3D255%2C255%2C255%26fit%3Dbounds%26height%3D%26width%3D&w=256&q=80",
      name: "Music",
    },
    {
      id: 6,
      image: "https://www.senq.com.my/_next/image?url=https%3A%2F%2Fthumbor.sirclocdn.xyz%2Funsafe%2F240x300%2Ffilters%3Aformat(webp)%2Fhttps%3A%2F%2Fmagento.senq.com.my%2Fmedia%2Fcatalog%2Fproduct%2Fp%2Fa%2Fpanasonic-hair-dryer-600x600-3.jpg%3Fquality%3D80%26bg-color%3D255%2C255%2C255%26fit%3Dbounds%26height%3D%26width%3D&w=256&q=80",
      name: "Fashion",
    },
  ];

  const images = [
    "https://thumbor.sirclocdn.xyz/unsafe/filters:format(webp)/https://magento.senq.com.my/media/amasty/bannerslider/Magic6_Pro_Launching_Inpage_Banner_dt_1920x500.jpg",
    "https://thumbor.sirclocdn.xyz/unsafe/filters:format(webp)/https://magento.senq.com.my/media/amasty/bannerslider/1920x500_18_.jpg",
    "https://thumbor.sirclocdn.xyz/unsafe/filters:format(webp)/https://magento.senq.com.my/media/amasty/bannerslider/MY_Raya_Apr24_Web_Banner_1920x500_BATTERY_FFH.jpg"
  ];

  const deals = [
    {
      id: "0",
      title: "Samsung Galaxy S23 Ultra 5G",
      oldPrice: 5799.00,
      price: 5299.00,
      image: "https://down-my.img.susercontent.com/file/my-11134207-7r991-lu8nlveazx1969",
      carouselImages: [
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_green_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_phantom_black_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_cream_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_lavender_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "1",
      title: "HUAWEI nova 12 SE",
      oldPrice: 5799.00,
      price: 5299.00,
      image: "https://down-my.img.susercontent.com/file/my-11134207-7r98t-ltngqgg4niha67",
      carouselImages: [
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_green_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_phantom_black_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_cream_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_lavender_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "2",
      title: "realme 12 Pro+ 5G",
      oldPrice: 5799.00,
      price: 5299.00,
      image: "https://down-my.img.susercontent.com/file/my-11134207-7r98q-ltvxpc6t6wy672",
      carouselImages: [
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_green_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_phantom_black_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_cream_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_lavender_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "3",
      title: "OPPO Reno11 5G 12GB + 256GB ",
      oldPrice: 5799.00,
      price: 5299.00,
      image: "https://down-my.img.susercontent.com/file/my-11134207-7r98w-lqd3t48pt0wl50",
      carouselImages: [
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_green_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_phantom_black_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_cream_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_lavender_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
  ];

  const offers = [
    {
      id: "0",
      title: "HONOR X9b 5G",
      offer: "7% Off",
      oldPrice: 1499.00,
      price: 1399.00,
      image: "https://down-my.img.susercontent.com/file/my-11134207-7r98y-lnayl1m0aocca9",
      carouselImages: [
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_green_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_phantom_black_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_cream_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_lavender_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "1",
      title: "Apple iPhone 15 Plus",
      offer: "14% Off",
      oldPrice: 5399.00,
      price: 4699.00,
      image: "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-color-lineup-geo-230912_big.jpg.large.jpg",
      carouselImages: [
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_green_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_phantom_black_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_cream_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_lavender_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "2",
      title: "Samsung Galaxy Z Flip5 5G",
      offer: "24% Off",
      oldPrice: 4999.00,
      price: 3809.00,
      image: "https://technave.com/data/files/article/202307130820229061.jpg",
      carouselImages: [
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_green_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_phantom_black_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_cream_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_lavender_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "3",
      title: "OPPO Reno10 Pro+ 5G",
      offer: "14% Off",
      oldPrice: 3499.00,
      price: 2999.00,
      image: "https://down-my.img.susercontent.com/file/my-11134207-7qul9-liuyh09q2ameb8",
      carouselImages: [
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_green_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_phantom_black_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_cream_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
        "https://magento.senq.com.my/media/catalog/product/s/2/s23_ultra_lavender_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
  ];

  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products: any = [];
        db.executeSql('SELECT image_url AS image, price AS price, rating AS rate, title AS title, description FROM products', [], (results: any) => {
          (results.rows.raw()).forEach((item: any) => {
            products.push(item);
          })
          setProducts(products);
        });
      } catch (error) {
        console.error(error);
        throw Error('Failed to get students !!!');
      }
    }
    fetchData();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);


  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: 'white',
        }}>

        <ScrollView>
          <View style={{ backgroundColor: "#00CED1", padding: 10, flexDirection: "row", alignItems: "center" }}>
            <Pressable style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: "white", borderRadius: 3, height: 38, flex: 1 }}>
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Search Klop.in" />
            </Pressable>
            <Icon name="mic" size={24} color="black" />
            <Pressable
              onPress={() => navigation.navigate('Login')}  // Assuming you have a navigation prop or useNavigation hook
            >
              <Icon name="person-circle-outline" size={24} color="black" />
            </Pressable>
          </View>

          <Pressable onPress={() => setModalVisible(!modalVisible)} style={{ flexDirection: "row", alignItems: "center", gap: 5, padding: 10, backgroundColor: "#AFEEEE" }}>
            <Icon name="location-outline" size={24} color="black" />
            <Pressable>
              <Text style={{ fontSize: 13, fontWeight: "500" }}>Deliver to Selangor - Kajang 43000</Text>
            </Pressable>
            <AntDesign
              style={{ paddingLeft: 10 }}
              name="arrowdown"
              size={22}
              color="black"
            />
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable key={index} style={{ margin: 10, justifyContent: "center", alignItems: "center" }}>
                <Image style={{ width: 50, height: 50, resizeMode: "contain" }} source={{ uri: item.image }} />
                <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "500", marginTop: 5, color: "black" }}>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <SliderBox images={images} autoPlay circleLoop dotColor={"#13274F"} inactiveDotColor="#90A4AE" ImageComponentStyle={{ width: "100%" }} />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold", color: "black" }}>Trending Deals of the week</Text>

          <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
            {deals.map((item, index) => (
              <Pressable style={{ marginVertical: 10, flexDirection: "row", alignItems: "center" }}>
                <Image style={{ width: 180, height: 180, resizeMode: "contain" }} source={{ uri: item?.image }} />
              </Pressable>
            ))}
          </View>

          <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 2, marginTop: 15 }} />
          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold", color: "black" }}>Today's Deals</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => navigation.navigate("Info", { item: item })}
                style={{
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image style={{ width: 150, height: 150, resizeMode: "contain" }} source={{ uri: item.image }} />
                <View style={{ backgroundColor: "#E31837", paddingVertical: 5, width: 130, justifyContent: "center", alignItems: "center", marginTop: 10, borderRadius: 4 }}>
                  <Text style={{ textAlign: "center", color: "white", fontSize: 13, fontWeight: "bold" }}>Up to {item.offer}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 2, marginTop: 15 }} />

          <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
            {products.map((item, index) => (
              <ProductItem item={item} key={index} />
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onbackDropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "black" }}>Choose your location</Text>
            <Text style={{ marginTop: 5, fontSize: 16, color: "grey" }}>Select a delivery location to see product availability and delivery options:</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text style={{ textAlign: "center", color: "#0066b2", fontWeight: "500" }}>Add and Address or pick up point</Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>Enter a postcode</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <Icon name="locate" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>Use my current location</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <AntDesign name="earth" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>Delivey Oversea</Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>

    </>
  );
};

export default HomeScreen;