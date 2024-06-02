document.addEventListener('DOMContentLoaded', function () {
    const adjustCanvasResolution = (canvas) => {
        const ctx = canvas.getContext('2d');
        const ratio = window.devicePixelRatio || 1;

        // Adjust canvas size to the ratio
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;

        // Scale canvas back to original size
        ctx.scale(ratio, ratio);
    };

    var tempCtx = document.getElementById('temperatureChart').getContext('2d');
    var humidityCtx = document.getElementById('humidityChart').getContext('2d');
    let temperature_data = new Array(30)
    let humidity_data = new Array(30)
    const connectionObject = {
        withCredentials: true,
    };
    const socket = io("http://localhost:8080")
    socket.emit('Env-data')
    socket.on('Env-update',() => {
        socket.emit('Env-data')
    })
    socket.on('Send-data', (data) => {
        console.log(data)
        data.forEach((value, index) => {
            temperature_data[index] = value.temp
            humidity_data[index] = value.hum
        });
        console.log(temperature_data)
        temperatureChart.data.datasets[0].data = temperature_data.reverse();
        temperatureChart.update();

        humidityChart.data.datasets[0].data = humidity_data.reverse();
        humidityChart.update();
    })

    var temperatureChart = new Chart(tempCtx, {
        type: 'line', // Choose other types like 'bar', 'pie', etc.
        data: {
            labels: Array.from({ length: temperature_data.length }, (_, i) => i * 10).reverse(),
            datasets: [{
                label: 'Temperature °C',
                data: temperature_data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    var humidityChart = new Chart(humidityCtx, {
        type: 'line', // Choose other types like 'bar', 'pie', etc.
        data: {
            labels: Array.from({ length: humidity_data.length }, (_, i) => i * 10).reverse(),
            datasets: [{
                label: 'Humidity %',
                data: humidity_data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
    // adjustCanvasResolution(tempCtx)
    // adjustCanvasResolution(humidityCtx)
});
