import React, { useState, useRef } from 'react'
import styles from "./Cccd.module.css"
import html2canvas from 'html2canvas';
import { images } from '../../data';
import logo from "../../images/Logo.png"
import Pin from "../../images/pin/pin1.png"
import DatePicker from "react-datepicker";
import { nanoid } from 'nanoid';
import { format, parseISO } from 'date-fns';
import diacritics from 'diacritics';
import "react-datepicker/dist/react-datepicker.css";
import { handleSubmit } from '../../utils';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Cccd() {
    const { user, dispatch } = useContext(AuthContext);
    // const [formattedAmount, setFormattedAmount] = useState("");
    // const [amountNumber, setAmountNumber] = useState("")
    const [photo, setPhoto] = useState(null);
    const componentRef = useRef(null);
    const copyRef = useRef(null);

    const [formState, setFormState] = useState({
        dateDob: Date(),
        dateExp: Date(),
        name: "",
        noNumber: "",
        nation: "Việt Nam",
        placeOrigin: "",
        placeResiden: "",
        dateStart: Date(),
        description: "",
        gender: "Nam",
    });

    const getFormattedDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const dayOfMonth = String(date.getDate()).padStart(2, '0'); // Định dạng ngày thành chuỗi với 2 chữ số, thêm '0' phía trước nếu cần
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Định dạng tháng thành chuỗi với 2 chữ số, thêm '0' phía trước nếu cần
        const year = date.getFullYear();

        return `${dayOfMonth}/${month}/${year}`;
    };


    const getFormattedDateBack = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const dayOfMonth = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);

        return `${year}${month}${dayOfMonth}`;
    };


    const { dateDob, dateExp, name, noNumber, nation, placeOrigin, placeResiden, dateStart, description, gender } = formState;


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const formatText = (name) => {
        // Tách chuỗi thành mảng các từ
        const words = name.split(' ');
        let formattedText = '';
    
        // Duyệt qua các phần tử và tạo chuỗi định dạng
        for (let i = 0; i < words.length; i++) {
            if (i > 0) {
                // Tính số lượng dấu < giữa các phần tử
                const numOfSigns = Math.max(0, words.length - i);
                formattedText += '<'.repeat(numOfSigns); 
            }
            formattedText += words[i];
        }
    
        // Đảm bảo tổng độ dài không vượt quá 30 ký tự
        if (formattedText.length < 28) {
            const remainingLength = 28 - formattedText.length;
            const filler = '<'.repeat(remainingLength);
            formattedText += filler;
        }
    
        return formattedText;
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
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

          // Các phần xử lý khác của handleFormSubmit
        });
        copyRef.current.style.display = "initial";
    };

    return (
        <div>
            <div className="content-body pb-5">
                <div className={styles.subContent}>
                    <h1 className={styles.title}>Fake CCCD</h1>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <form onSubmit={handleFormSubmit}>
                            <h1>Form thông tin</h1>

                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="date"
                                            id="form6Example1"
                                            placeholder="01/01/1999"
                                            className={`form-control ${styles.inputCus}`}
                                            name="dateDob"
                                            value={dateDob}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-label" htmlFor="form6Example1">
                                            Ngày sinh
                                        </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="date"
                                            id="form6Example1"
                                            placeholder="10/10/2026"
                                            className={`form-control ${styles.inputCus}`}
                                            name="dateExp"
                                            value={dateExp}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-label" htmlFor="form6Example1">
                                            Ngày hết hạn
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="name"
                                            value={name}
                                            onChange={handleInputChange}
                                            id="form6Example1" placeholder='Nguyễn Văn A' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example1">Họ và tên</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="nation"
                                            value={nation}
                                            onChange={handleInputChange}
                                            id="form6Example2" placeholder='Việt Nam' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example2">Quốc tịch</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="placeOrigin"
                                            value={placeOrigin}
                                            onChange={handleInputChange}
                                            id="form6Example1" placeholder='Thôn Bình Tâm, xã Bình An, tỉnh An Tâm' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example1">Quê quán</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="placeResiden"
                                            value={placeResiden}
                                            onChange={handleInputChange}
                                            id="form6Example2" placeholder='Tổ 02, Dĩ An, Bình Dương' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example2">Nơi thường trú</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="noNumber"
                                            value={noNumber}
                                            onChange={handleInputChange}
                                            id="form6Example1" placeholder='032199203091' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example1">Số CCCD</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="date"
                                            id="form6Example1"
                                            placeholder="10/10/2021"
                                            className={`form-control ${styles.inputCus}`}
                                            name="dateStart"
                                            value={dateStart}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-label" htmlFor="form6Example1">
                                            Ngày cấp
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className='d-flex align-items-start'>
                                        <label className='mr-3'>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Nam"
                                                checked={gender === 'Nam'}
                                                onChange={handleInputChange}
                                            />
                                            Nam
                                        </label>
                                        <label className='mr-3'>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Nữ"
                                                checked={gender === 'Nữ'}
                                                onChange={handleInputChange}
                                            />
                                            Nữ
                                        </label>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className={styles.boxUploadFile}>
                                        <div className={styles.type}>
                                            {photo ? `${photo.name}` : "PNG, JPG, GIF, WEBP or MP4. Max 200mb."}
                                        </div>
                                        <input
                                            id="upLoadPhoto"
                                            className={styles.upLoadFile}
                                            type="file"
                                            onChange={(e) => setPhoto(e.target.files[0])}
                                        />
                                        <label htmlFor="upLoadPhoto" className="btn">
                                            Browser
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn-c btn-block mb-4">Tạo ngay</button>
                        </form>
                    </div>
                    <div ref={componentRef} className={`${styles.right}`}>
                        <div className={`${styles.righttop}`}>
                            <img src={images.frontcccd} alt={"frontcccd"} />
                            {photo && (
                                <img
                                    className={styles.avatar}
                                    src={URL.createObjectURL(photo)}
                                    alt=""
                                />
                            )}
                            <span className={`${styles.name} position-absolute`}>{name}</span>
                            <span className={`${styles.noNumber} position-absolute`}>{noNumber}</span>
                            <span className={`${styles.dateDob} position-absolute`}>{getFormattedDate(dateDob)}</span>
                            <span className={`${styles.dateExp} position-absolute`}>{getFormattedDate(dateExp)}</span>
                            <span className={`${styles.nation} position-absolute`}>{nation}</span>
                            <span className={`${styles.gender} position-absolute`}>{gender}</span>
                            <span className={`${styles.placeOrigin} position-absolute`}>{placeOrigin}</span>
                            <span className={`${styles.placeResiden} position-absolute`}>{placeResiden}</span>
                        </div>
                        <div className={`${styles.rightbottom}`}>
                            <img src={images.backcccd} alt={"frontcccd"} />
                            <span className={`${styles.dateStart} position-absolute`}>{getFormattedDate(dateStart)}</span>
                            <span className={`${styles.description} position-absolute`}>
                                <div>{`IDVNM${noNumber.substring(3)}8${noNumber}<<8`}</div>
                                <div>{`${getFormattedDateBack(dateDob)}6M2627015VNM<<<<<<<<<<<6`}</div>
                                <div style={{ textTransform: "uppercase" }}>{formatText(name)}</div>
                            </span>
                        </div>
                        {/* <span className={`${styles.date} position-absolute`}>{formattedDate}</span>
                        <span className={`${styles.time} position-absolute`}>{time}</span>
                        <span className={`${styles.transactionCode} position-absolute`}>{transactionCode}</span>
                        <span className={`${styles.senderNumber} position-absolute`}>{`********${senderNumber}`}</span>
                        <span className={`${styles.senderAccount} position-absolute text-uppercase`}>{diacritics.remove(senderAccount)}</span>
                        <span className={`${styles.receiverAccount} position-absolute`}>{receiverAccount}</span>
                        <span className={`${styles.receiverName} position-absolute text-uppercase`}>{diacritics.remove(receiverName)}</span>
                        <span className={`${styles.amountNumber} position-absolute`}>{`${formattedAmount} VND`}</span>
                        <span className={`${styles.amountText} position-absolute`}>{capitalizedText}</span>
                        <span className={`${styles.description} position-absolute`}>{diacritics.remove(description)}</span>
                        <div className={`${styles.taskbar}`}>
                            <div className={`${styles.timePhone}`}>{time}</div>
                            <div className={styles.taskbarRight}>
                                {imageName && <img className={`${styles.imageSong}`} src={imageName} alt={`WIFI${selectedOption}`} />}
                                {imageWifi && <img className={`${styles.imageWifi}`} src={imageWifi} alt={`WIFI${selectedOptionWifi}`} />}
                                <span className={`${styles.boxPin}`}>
                                    <div className={`pin-container position-relative ${styles.pinne}`}>
                                        <img className='position-absolute' src={Pin} alt='pin' />
                                        <div className="position-absolute" style={{ height: 6.5, width: `calc(${pinWidth} + 2px)`, backgroundColor: pinColor }}></div>
                                    </div>
                                </span>
                            </div>

                        </div>

                        

                        {selectedBankData && <span className={`${styles.nameBank} position-absolute`}>{selectedBankData.fullname}</span>}
                        <div ref={copyRef} className={styles.copy}>
                            <div>Bản quyền thuộc về </div>
                            <img src={logo} alt='logo' />
                        </div> */}
                    </div>
                </div>

            </div>
        </div>
    )
}
