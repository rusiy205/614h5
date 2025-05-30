// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化动画效果
    initAnimations();
    
    // 绑定事件监听器
    bindEventListeners();
});

// 显示报名模态框
function showRegistration() {
    const modal = document.getElementById('registration-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 防止背景滚动
    
    // 添加淡入动画
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
    }, 10);
}

// 隐藏报名模态框
function hideRegistration() {
    const modal = document.getElementById('registration-modal');
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复滚动
    }, 300);
}

// 绑定事件监听器
function bindEventListeners() {
    // 点击模态框外部关闭
    const modal = document.getElementById('registration-modal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideRegistration();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideRegistration();
        }
    });
    
    // 表单提交处理
    const form = document.querySelector('.registration-form');
    form.addEventListener('submit', handleFormSubmit);
    
    // 平滑滚动到各个部分
    addSmoothScrolling();
    
    // 添加视差滚动效果
    addParallaxEffect();
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // 显示提交动画
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '提交中...';
    submitBtn.disabled = true;
    
    // 模拟提交过程
    setTimeout(() => {
        // 这里可以添加实际的提交逻辑，比如发送到服务器
        console.log('报名数据:', data);
        
        // 显示成功消息
        alert('报名成功！我们会尽快与您联系。');
        
        // 重置表单
        e.target.reset();
        
        // 恢复按钮状态
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // 关闭模态框
        hideRegistration();
    }, 2000);
}

// 初始化动画效果
function initAnimations() {
    // 创建观察器，用于滚动时触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll(
        '.highlight-card, .timeline-item, .product-card, .org-item, .speaker-card, .company-card, .theme-banner'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // 添加CSS动画类
    addAnimationStyles();
}

// 动态添加动画样式
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .highlight-card,
        .timeline-item,
        .product-card,
        .org-item,
        .speaker-card,
        .company-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .theme-banner {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .timeline-item.animate-in {
            animation: slideInLeft 0.6s ease forwards;
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .highlight-card.animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .product-card.animate-in {
            animation: zoomIn 0.8s ease forwards;
        }
        
        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .theme-banner.animate-in {
            animation: bannerSlideIn 1s ease forwards;
        }
        
        @keyframes bannerSlideIn {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// 添加平滑滚动
function addSmoothScrolling() {
    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 添加视差滚动效果
function addParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // 移动星空背景
        const stars = document.querySelectorAll('.stars, .stars2, .stars3');
        stars.forEach((star, index) => {
            const speed = (index + 1) * 0.2;
            star.style.transform = `translateY(${rate * speed}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// 添加鼠标跟踪光效
function addMouseTracker() {
    const tracker = document.createElement('div');
    tracker.className = 'mouse-tracker';
    tracker.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(tracker);
    
    document.addEventListener('mousemove', (e) => {
        tracker.style.left = (e.clientX - 10) + 'px';
        tracker.style.top = (e.clientY - 10) + 'px';
    });
}

// 添加音效（可选）
function addSoundEffects() {
    // 创建音频上下文
    let audioContext;
    
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    function playClickSound() {
        initAudio();
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // 为按钮添加点击音效
    document.querySelectorAll('button, .highlight-card').forEach(element => {
        element.addEventListener('click', playClickSound);
    });
}

// 添加实时时钟倒计时
function addCountdown() {
    const eventDate = new Date('2025-06-14T09:30:00');
    
    function updateCountdown() {
        const now = new Date();
        const diff = eventDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // 可以在页面上显示倒计时
            const countdownText = `距离活动开始还有 ${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
            
            // 更新页面上的倒计时显示（如果有的话）
            const countdownElement = document.querySelector('.countdown');
            if (countdownElement) {
                countdownElement.textContent = countdownText;
            }
        }
    }
    
    // 每秒更新倒计时
    setInterval(updateCountdown, 1000);
    updateCountdown(); // 立即执行一次
}

// 初始化所有增强功能
function initEnhancements() {
    addMouseTracker();
    addSoundEffects();
    addCountdown();
}

// 页面完全加载后初始化增强功能
window.addEventListener('load', initEnhancements); 
