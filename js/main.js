document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // 默认显示第一个 Tab (或者根据 URL hash)
    let activeTabId = 'ch1';
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (document.getElementById(hash)) {
            activeTabId = hash;
        }
    }

    activateTab(activeTabId);

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            activateTab(targetId);
            
            // 移动端：点击后滚动到内容区域顶部
            if (window.innerWidth <= 900) {
                document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    function activateTab(tabId) {
        // 更新按钮状态
        navBtns.forEach(btn => {
            if (btn.getAttribute('data-target') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 更新内容显示
        tabContents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // 更新 URL hash，方便分享，但不触发滚动
        history.replaceState(null, null, `#${tabId}`);
    }
});