document.addEventListener('DOMContentLoaded', () => {
    const clock = document.getElementById('clock');
    const now = new Date();
    let currentSecond;

    function updateTime() {
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // 更新时间显示和指针位置
        clock.querySelector('.hour-pointer').style.transform = `rotate(${(hours % 12) * 30 + (minutes / 60) * 30}deg)`;
        clock.querySelector('.minute-pointer').style.transform = `rotate(${(minutes / 59.5) * 6 - 27}deg)`;
        clock.querySelector('.second-pointer').style.transform = `rotate(${seconds / 59.5 * 6}deg)`;

        // 更新数字标签显示
        clock.querySelector('.digital-clock').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        currentSecond = seconds;
    }

    updateTime();

    setInterval(updateTime, 1000);
});