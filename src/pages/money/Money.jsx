import React, { useState, useEffect, useContext, useRef } from 'react'
import styles from "./Money.module.css"
import { AuthContext } from "../../context/AuthContext";

export default function Money() {
    const { user } = useContext(AuthContext);
    console.log(user)
    return (
        <div>
            <div className={`content-body pb-5 d-flex ${styles.money}`}>
                <div className={`${styles.right}`}>
                    <h2>Giới thiệu kiếm tiền triệu</h2>
                    <div className={`input-group flex-nowrap ${styles.form}`}>
                        <span className={`${styles.inputForm}`} id="addon-wrapping">Mã giới thiệu của bạn là:</span>
                        <span className={`${styles.inputForm}`} style={{ color: "white" }} id="addon-wrapping">{user._id}</span>
                        <span className={`${styles.inputForm} btn-c`} id="addon-wrapping">Copy</span>
                    </div>
                    <hr />
                    <div className={styles.boxInfo}>
                        <div className={`${styles.info}`}>
                            <div className={`${styles.info1}`}>Số tiền có thể rút :</div>
                            <div className={`${styles.info2}`}>0đ [Trực tiếp]</div>
                        </div>
                        <div className={`${styles.info}`}>
                            <div className={`${styles.info1}`}>Số tài khoản giới thiệu :</div>
                            <div className={`${styles.info2}`}>0 tài khoản</div>
                        </div>
                        <div className={`${styles.info}`}>
                            <div className={`${styles.info1}`}>Tổng số khách nạp</div>
                            <div className={`${styles.info2}`}>0 tài khoản</div>
                        </div>
                        <div className={`${styles.info}`}>
                            <div className={`${styles.info1}`}>Số tiền kiếm được</div>
                            <div className={`${styles.info2}`}>0đ</div>
                        </div>
                        <div className={`${styles.info}`}>
                            <div className={`${styles.info1}`}>Hoa hồng trực tiếp</div>
                            <div className={`${styles.info2}`}>10% / đơn nạp thành công</div>
                        </div>
                        <div className={`${styles.info}`}>
                            <div className={`${styles.info1}`}>Số lần đã rút tiền</div>
                            <div className={`${styles.info2}`}>0 lần rút</div>
                        </div>

                        <div className={`${styles.info}`}>
                            <div className={`${styles.info1}`}>Tổng số tiền đã rút</div>
                            <div className={`${styles.info2}`}>0đ</div>
                        </div>
                    </div>
                    <div style={{display: "flex", gap: "2rem", margin : "1rem"}}>
                        <button className={styles.btnrutien}>Rút tiền</button>
                        <button className={styles.btnchuyentien}>Chuyển tiền</button>
                    </div>
                </div>
                <div className={`${styles.left}`}>
                    <h2>Hướng dẫn sử dụng</h2>
                    <hr />
                    <div className={styles.boxhdsd}>
                        <div>
                            <span className={styles.getColor}>- Chỉ có thể rút tiền từ tài khoản giới thiệu: </span>
                            <span>Số tiền này kiếm được khi các tài khoản giới thiệu nạp tiền vào web, hoa hồng 10%/tổng số tiền nạp của tài khoản giới thiệu</span>
                        </div>
                        <div>
                            <span className={styles.getColor}>- Bước 1 :</span>
                            <span>Nhấn vào rút tiền, sẽ xuất hiện hộp thoại rút tiền</span>
                        </div>
                        <div>
                            <span className={styles.getColor}>- Bước 2 :</span>
                            <span>Nhập thông tin tài khoản nhận tiền gồm : chủ tài khoản, số tài khoản và Ngân hàng</span>
                        </div>
                        <div>
                            <span className={styles.getColor}>- Bước 3 :</span>
                            <span>Nhập số tiền muốn rút</span>
                        </div>
                        <div>
                            <span className={styles.getColor}>- Bước 4 :</span>
                            <span>Nhân vào "Lấy mã" để lấy OTP rút tiền, mã OTP sẽ được gửi vào email của quý khách</span>
                        </div>
                        <div>
                            <span className={styles.getColor}>- Bước 5 :</span>
                            <span>Nhập mã OTP và nhấn xác nhận để rút tiền</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
