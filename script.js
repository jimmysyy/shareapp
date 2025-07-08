document.addEventListener('DOMContentLoaded', function() {
    const defaultVisibleRowsCount = 15; // 默认可见的行数

    // 为每个资源分类处理折叠逻辑
    document.querySelectorAll('.resource-category').forEach(categoryDiv => {
        const tableBody = categoryDiv.querySelector('.resource-table tbody');
        const toggleButton = categoryDiv.querySelector('.toggle-more-btn');

        if (!tableBody || !toggleButton) {
            console.warn('缺少表格体或折叠按钮，跳过此分类。');
            return;
        }

        // 获取所有行（TR元素）
        const allRows = Array.from(tableBody.querySelectorAll('tr'));
        const hiddenRows = allRows.slice(defaultVisibleRowsCount); // 获取所有需要隐藏的行

        // 如果需要隐藏的行少于等于0（即总行数不超过默认可见数），则隐藏按钮并返回
        if (hiddenRows.length <= 0) {
            toggleButton.style.display = 'none';
            return;
        }

        // 初始状态：确保隐藏行是隐藏的，并设置按钮文本
        hiddenRows.forEach(row => {
            row.style.display = 'none'; // 确保这些行初始是隐藏的
        });
        toggleButton.textContent = '显示更多';
        toggleButton.dataset.expanded = 'false'; // 标记当前状态为未展开

        // 添加点击事件监听器
        toggleButton.addEventListener('click', function() {
            const isExpanded = this.dataset.expanded === 'true';

            if (isExpanded) {
                // 当前是展开状态，点击后收起
                hiddenRows.forEach(row => {
                    row.style.display = 'none'; // 隐藏所有需要隐藏的行
                });
                this.textContent = '显示更多';
                this.dataset.expanded = 'false';
            } else {
                // 当前是收起状态，点击后展开
                hiddenRows.forEach(row => {
                    row.style.display = 'table-row'; // 显示所有需要隐藏的行，table-row 是 TR 的默认 display
                });
                this.textContent = '收起';
                this.dataset.expanded = 'true';
            }
            // 滚动到按钮上方一点，让用户能看到表格展开
            // 注意：这里滚动到 categoryDiv 的底部，可以根据需要调整滚动目标
            categoryDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
    });
});