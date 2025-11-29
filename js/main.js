document.addEventListener('DOMContentLoaded', () => {
    // 侧边栏平滑滚动与高亮
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const sidebar = document.querySelector('.sidebar');

    // 平滑滚动点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 在移动端点击后可能需要收起菜单(此处暂略，视需求添加)
            }
        });
    });

    // 滚动监听，更新 Active 状态
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', // 调整视口判定区域
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 移除所有 active 类
                navLinks.forEach(link => link.classList.remove('active'));
                
                // 给当前可见的 section 对应的链接添加 active
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
