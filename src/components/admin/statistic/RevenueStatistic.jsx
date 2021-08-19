import React, { useEffect, useRef, useState } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2'
import callApi from '../../../callAPI/apiCaller';
import getCookie from '../../../utils/CookieUtils';
function RevenueStatistic(props) {
    const [datas, setDatas] = useState([])
    const sales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const [year, setYear] = useState(2021)
    const token = getCookie("token");
    useEffect(() => {
        callApi("admin/statistical/getSales", 'GET', null,
            {
                year: year
            },
            {
                Authorization: `Bearer ${token}`,
            }
        ).then((response) => {
            if (response.status == 200) {
                response.data.forEach(element => {
                    sales.splice(element[0] - 1, 1, element[1])
                });
                setDatas(sales)
            }

        }).catch((error) => {
            console.log(error)
        })


    }, [year])
    function onChangeYear(e) {
        const value = e.target.value;
        setYear(value)
    }
    return (
        <div className="container">
            <h3 className="text-center mt-3 mb-3">Thống kê doanh thu</h3>
            <hr />
            <div className="mb-4" style={{ margin: '25px 844px' }}>
                <input
                    onChange={onChangeYear}
                    value={year}
                    style={{ width: "200px" }}
                    className="form-control"
                    placeholder="Nhập năm cần thông kê..."
                />
            </div>
            <div style={{ width: '920px', margin: 'auto' }}>
                <Bar
                    data={{
                        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',],
                        datasets: [
                            {
                                label: 'Danh thu trong năm ',
                                data: datas,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1

                            },
                        ]
                    }}

                >
                </Bar>
            </div>
        </div>

    );
}

export default RevenueStatistic;