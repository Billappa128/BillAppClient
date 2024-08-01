import React, { useState, useRef } from 'react'
import styles from "./Acbbanking.module.css"
import ACB from "../../../../images/billbanking/ck-acb.png"
import html2canvas from 'html2canvas';
import { nameBank, songMappings1, wifiMappings1 } from '../../../../data';
import logo from "../../../../images/Logo.png"
import Pin from "../../../../images/pin/pin1.png"
import DatePicker from "react-datepicker";
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import diacritics from 'diacritics';
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import { handleSubmit } from '../../../../utils';
import { AuthContext } from "../../../../context/AuthContext";

export default function Acbbanking() {
    const [processing, setProcessing] = useState(false);
    const { user, dispatch } = useContext(AuthContext);
    const [formattedAmount, setFormattedAmount] = useState("");
    const [amountNumber, setAmountNumber] = useState("")
    const componentRef = useRef(null);
    const copyRef = useRef(null);

    const [selectedBank, setSelectedBank] = useState(''); // State lưu trữ tên ngân hàng được chọn

    const handleSelectChange = (event) => {
        setSelectedBank(event.target.value); // Cập nhật tên ngân hàng được chọn
    };

    const selectedBankData = nameBank.find((bank) => bank.name === selectedBank); // Tìm dữ liệu ngân hàng tương ứng với tên ngân hàng được chọn

    // Ramdom
    const randomString = nanoid(15);

    // -------Thay Hinh Nen
    const [selectedImage, setSelectedImage] = useState('image1');

    const imageOptions = [
        { value: 'image1', label: 'Hình Nền 1', path: ACB },
        // Thêm các hình ảnh khác vào đây
    ];

    const handleImageChange = (e) => {
        setSelectedImage(e.target.value);
    };
    // --------Het Thay Hinh Nen

    //-------SÓNG ĐTH
    const [songChecked, setSongChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const handleSongChange = (e) => {
        setSongChecked(e.target.checked);
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const imageName = songChecked && selectedOption ? songMappings1[selectedOption] : null;
    // -------SÓNG ĐTH

    //-------SÓNG WIFI
    const [wifiChecked, setWifiChecked] = useState(false);
    const [selectedOptionWifi, setSelectedOptionWifi] = useState('');

    const handleWifiChange = (e) => {
        setWifiChecked(e.target.checked);
    };

    const handleOptionChangeWifi = (e) => {
        setSelectedOptionWifi(e.target.value);
    };

    const imageWifi = wifiChecked && selectedOptionWifi ? wifiMappings1[selectedOptionWifi] : null;

    // -------SÓNG WIFI


    // ---------PIn
    const [pinPercentage, setPinPercentage] = useState(0);

    const handlePinPercentageChange = (e) => {
        const percentage = parseInt(e.target.value);
        setPinPercentage(percentage);
    };

    const pinWidth = `${pinPercentage}%`;
    const pinColor = pinPercentage < 20 ? "#ff3737" : '#000';
    // --------HẾT PIN 

    const [formState, setFormState] = useState({
        date: "",
        time: "",
        transactionCode: randomString,
        senderNumber: "",
        senderAccount: "",
        receiverAccount: "",
        receiverName: "",
        description: "",
    });

    const { date, time, senderNumber, senderAccount, receiverAccount, receiverName } = formState;

    // Set date
    const formattedDate = date ? format(new Date(date), 'dd/MM/yyyy') : '';
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    };

    //Set time
    const [selectedTime, setSelectedTime] = useState(null);
    const handleTimeChange = (date) => {
        setSelectedTime(date);
        const formattedTime = date ? format(new Date(date), 'HH:mm') : '';
        setFormState((prevState) => ({
            ...prevState,
            time: formattedTime,
        }));
    };

    
    const [amountText, setAmountText] = useState('');

    
    const numberToText = (num) => {
        const digits = [
          'không',
          'một',
          'hai',
          'ba',
          'bốn',
          'năm',
          'sáu',
          'bảy',
          'tám',
          'chín',
        ];
      
        const units = ['','nghìn', 'triệu', 'tỷ']; // Loại bỏ "đồng" ra khỏi mảng
      
        const toText = (num, level) => {
          if (num === 0) return '';
          if (num < 10) {
            return digits[num] + (level === 0 ? '' : ' ' + units[level]);
          }
      
          let result = '';
          const hundreds = Math.floor(num / 100);
          const tensAndOnes = num % 100;
      
          if (hundreds > 0) {
            result += digits[hundreds] + ' trăm ';
          }
      
          if (tensAndOnes === 0) {
            result += units[level];
          } else if (tensAndOnes < 10) {
            result += digits[tensAndOnes] + (level === 0 ? '' : ' ' + units[level]);
          } else if (tensAndOnes < 20) {
            result += digits[tensAndOnes] + ' ' + units[level];
          } else {
            result += digits[Math.floor(tensAndOnes / 10)] + ' mươi ';
            if (tensAndOnes % 10 !== 0) {
              result += digits[tensAndOnes % 10] + ' ';
            }
            result += units[level];
          }
      
          return result.trim();
        };
      
        let text = '';
        let level = 0;
      
        if (num === 0) {
          return 'không';
        }
      
        while (num > 0) {
          const currentNum = num % 1000;
          num = Math.floor(num / 1000);
      
          if (currentNum > 0) {
            const currentText = toText(currentNum, level);
            text = currentText + ' ' + text;
          }
      
          level++;
        }
      
        return text;
      };
      
      
      

    const handleInputAmount = (e) => {
        const capitalizeFirstLetter = (str) => {
            if (str.length === 0) return str;
            return str.charAt(0).toUpperCase() + str.slice(1);
          };
        const amount = parseFloat(e.target.value.replace(/,/g, "")); // Chuyển đổi giá trị thành số và loại bỏ dấu phẩy
        const formattedAmount = isNaN(amount)
            ? ""
            : new Intl.NumberFormat("vi-VN").format(amount); // Định dạng giá trị có dấu phẩy mà không hiển thị đơn vị tiền tệ
        setFormattedAmount(formattedAmount); // Cập nhật giá trị đã định dạng
        setAmountNumber(e.target.value);

        // Chuyển đổi số tiền thành chữ và cập nhật giá trị vào ô input text số tiền bằng CHỮ
        const text = numberToText(amount) + "đồng";
        const capitalizedText = capitalizeFirstLetter(text);
        setAmountText(capitalizedText);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (processing) return; // Ngăn người dùng nhấn liên tục

        setProcessing(true);
        copyRef.current.style.display = "none";
        const timestamp = Date.now(); // Lấy thời gian hiện tại dưới dạng timestamp
        const filename = `${timestamp}.png`; // Tạo tên file dựa trên timestamp

        html2canvas(componentRef.current).then(async (canvas) => {
            const image = canvas.toDataURL();
            const blob = await fetch(image).then((res) => res.blob());
            const formData = new FormData();
            formData.append("name", filename);
            formData.append('file', blob);

            // Gọi hàm handleSubmit từ utils.js và truyền các thông tin cần thiết
            await handleSubmit(formData, user, dispatch, filename, blob);
            setProcessing(false);
            // Các phần xử lý khác của handleFormSubmit
        });
        copyRef.current.style.display = "initial";
    };

    return (
        <div>
            <div className="content-body pb-5">
                <div className={styles.subContent}>
                    <h1 className={styles.title}>Bill Chuyển tiền</h1>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <form onSubmit={handleFormSubmit}>
                            <h1>Form chuyển khoản</h1>

                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="date"
                                            id="form6Example1"
                                            placeholder="18/09/2023"
                                            className={`form-control ${styles.inputCus}`}
                                            name="date"
                                            value={date}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-label" htmlFor="form6Example1">
                                            Ngày
                                        </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            placeholder="20:37"
                                            className={`form-control ${styles.inputCus}`}
                                            name="time"
                                            value={time}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-label" htmlFor="test111">
                                            Chọn giờ ở đây :
                                        </label>
                                        <DatePicker
                                            style={{ display: "none" }}
                                            id='test111'
                                            selected={selectedTime}
                                            onChange={handleTimeChange}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="HH:mm"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="senderNumber"
                                            value={senderNumber}
                                            onChange={handleInputChange}
                                            id="form6Example1" placeholder='2301' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example1">STK người gửi</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="senderAccount"
                                            value={senderAccount}
                                            onChange={handleInputChange}
                                            id="form6Example2" placeholder='NGUYEN VAN A' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example2">Tên người gửi</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="receiverAccount"
                                            value={receiverAccount}
                                            onChange={handleInputChange}
                                            id="form6Example1" placeholder='104877735670' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example1">STK người nhận</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="receiverName"
                                            value={receiverName}
                                            onChange={handleInputChange}
                                            id="form6Example2" placeholder='NGO LUU HONG NGOC' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example2">Tên người nhận</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="amountNumber"
                                            value={amountNumber}
                                            onChange={handleInputAmount}
                                            id="form6Example1" placeholder='30,000 VND' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example1">Số tiền bằng SỐ</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="amountText"
                                            value={amountText}
                                            onChange={handleInputChange}
                                            id="form6Example2" placeholder='Ba mươi nghìn đồng' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example2">Số tiền bằng CHỮ</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className='d-flex align-items-start'>
                                        <label className='mr-3'>
                                            <input type="checkbox" checked={songChecked} onChange={handleSongChange} />
                                            Sóng điện thoại 1:
                                        </label>
                                        <select className={`${styles.selectCus}`} value={selectedOption} onChange={handleOptionChange}>
                                            <option value="">Chọn mức sóng</option>
                                            <option value="1">1 Vạch</option>
                                            <option value="2">2 Vạch</option>
                                            <option value="3">3 Vạch</option>
                                            <option value="4">4 Vạch</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <select className='mb-3' value={selectedImage} onChange={handleImageChange}>
                                        <option value="">-- Chọn hình ảnh --</option>
                                        {imageOptions.map((image) => (
                                            <option key={image.value} value={image.value}>
                                                {image.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col">
                                    <div className='d-flex align-items-start'>
                                        <label className='mr-3'>
                                            <input type="checkbox" checked={wifiChecked} onChange={handleWifiChange} />
                                            Sóng Wifi :
                                        </label>
                                        <select className={`${styles.selectCus}`} value={selectedOptionWifi} onChange={handleOptionChangeWifi}>
                                            <option value="">Chọn mức sóng</option>
                                            <option value="1">1 Vạch</option>
                                            <option value="2">2 Vạch</option>
                                            <option value="3">3 Vạch</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className='d-flex align-items-center'>
                                        <div className='mr-3'>Chọn % Pin:</div>
                                        <input
                                            className={styles.inputPin}
                                            type="number"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={pinPercentage}
                                            onChange={handlePinPercentageChange}
                                        />

                                    </div>
                                </div>
                            </div>
                            <select className={`form-control ${styles.selectCus}`} value={selectedBank} onChange={handleSelectChange}>
                                <option value="">-- Chọn một ngân hàng --</option>
                                {nameBank.map((bank) => (
                                    <option key={bank.name} value={bank.name}>
                                        {bank.name}
                                    </option>
                                ))}
                            </select>
                            <button type='submit' className="btn-c btn-block mb-4" tabindex="4" disabled={processing}>
                                {processing ? "Đang xử lý..." : "In bill ngay"}
                            </button>
                        </form>
                    </div>
                    <div ref={componentRef} className={`${styles.right} position-relative`}>
                        <img src={imageOptions.find((image) => image.value === selectedImage)?.path} alt={selectedImage} />
                        <span className={`${styles.date} position-absolute`}>{`${formattedDate} - ${time}:17`}</span>
                        <span className={`${styles.date1} position-absolute`}>{formattedDate}</span>
                        <span className={`${styles.senderNumber} position-absolute`}>{`${senderNumber}`}</span>
                        <span className={`${styles.senderAccount} position-absolute text-uppercase`}>{diacritics.remove(senderAccount)}</span>
                        <span className={`${styles.receiverAccount} position-absolute`}>{receiverAccount}</span>
                        <span className={`${styles.receiverName} position-absolute text-uppercase`}>{diacritics.remove(receiverName)}</span>
                        <span className={`${styles.amountNumber} position-absolute`}>{`${formattedAmount} VND`}</span>
                        <span className={`${styles.amountText} position-absolute`}>{amountText}</span>
                        <div className={`${styles.taskbar}`}>
                            <div className={`${styles.timePhone}`}>{time}</div>
                            <div className={styles.taskbarRight}>
                                {imageName && <img className={`${styles.imageSong}`} src={imageName} alt={`WIFI${selectedOption}`} />}
                                {imageWifi && <img className={`${styles.imageWifi}`} src={imageWifi} alt={`WIFI${selectedOptionWifi}`} />}
                                <span className={`${styles.boxPin}`}>
                                    <div className={`pin-container position-relative ${styles.pinne}`}>
                                        <img className='position-absolute' src={Pin} alt='pin' />
                                        <div className="position-absolute" style={{ height: 11, width: `calc(${pinWidth} + 2px)`, backgroundColor: pinColor }}></div>
                                    </div>
                                </span>
                            </div>

                        </div>

                        {selectedBankData && <span className={`${styles.nameBank} position-absolute text-uppercase`}>{`${diacritics.remove(selectedBankData.name)} - ${diacritics.remove(selectedBankData.acbname)}`}</span>}
                        <div ref={copyRef} className={styles.copy}>
                            <div>Bản quyền thuộc về </div>
                            <img src={logo} alt='logo' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}