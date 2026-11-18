# 日常集 · 生活工作台

一个可以装到手机桌面、离线也能用的完整 App。记账、习惯、减脂、日程、待买清单、书影音收藏，七个模块收在一个页面里。

- **在线地址**：https://mannus-w.github.io/
- **源码仓库**：https://github.com/MANNUS-W/MANNUS-W.github.io
- **形态**：PWA（网页 App，可安装）+ Android 安装包（APK，由 GitHub Actions 自动构建）

---

## 一、怎么装到手机 / 电脑

### 安卓手机（Chrome / Edge / 夸克等）
1. 用浏览器打开 https://mannus-w.github.io/
2. 浏览器菜单里选「添加到主屏幕」或「安装应用」（页面顶部也有「安装到桌面」按钮）
3. 桌面会出现「日常集」图标，点开全屏运行，没有地址栏

### iPhone（Safari）
1. Safari 打开 https://mannus-w.github.io/
2. 点底部「分享」→「添加到主屏幕」
3. 桌面出现图标，全屏运行

### 电脑（Chrome / Edge）
打开网址后，地址栏右侧会出现安装图标，点击即可；装完可从开始菜单/程序列表启动。

### 想要真正的 Android 安装包（APK）
在仓库的 **Actions → 构建 Android 安装包 (APK) → Run workflow**，等约 10 分钟构建完成，在 Actions 产物或 Releases 里下载 `app-debug.apk`，传到手机安装即可（需在系统设置里允许「安装未知来源应用」）。

> 两种形态用的是同一份代码。PWA 走浏览器，APK 是把同一份页面用 Capacitor 装进原生 WebView 外壳。

---

## 二、功能

| 模块 | 内容 |
|---|---|
| 今日概览 | 待办、逾期、习惯进度、今日收支、待买清单、正在看的书影音，一屏汇总 |
| 记账理财 | 收支记录、月度预算、六月对比、分类筛选、消费结构、CSV 导出 |
| 习惯健康 | 自定义习惯，勾选 / 计数 / 数值三种打卡方式，30 天热力图 |
| 减脂健身 | 体重体脂、7 日均线、BMI、目标进度、热量缺口、自定义周计划 |
| 日程统筹 | 高/中/低优先级、逾期顺延、完成率统计 |
| 待买清单 | 分类、数量、预计花费、已买标记 |
| 书影音收藏 | 状态、星级、短评、封面墙 / 列表双视图、年度统计 |

视觉走「纸质生活杂志」方向：松绿 + 陶土 + 衬线标题，克制、不模板化；手机和电脑都做了适配。

---

## 三、数据存在哪里（重要）

**数据存在设备本机的浏览器存储（localStorage）里，不做跨设备云同步。**

- 好处：断网也能用，打开快，不经任何服务器，隐私性好。
- 代价：手机和电脑各存各的，换浏览器/清缓存数据会没。
- **请定期备份**：页面「今日概览」右上角有「导出备份」，会下载一个 `日常集备份_日期.json`；换设备时用「导入恢复」选这个文件即可还原全部数据。记账模块另有「导出 CSV」。

> 原始需求里提过「在线数据表双向同步」，当年因平台接口权限未打通，最终没有实现。若以后要真正的多设备同步，需要另接云数据库（可随时补做）。

---

## 四、目录结构

```
.
├── index.html                 应用主体（单文件，含全部逻辑与样式）
├── manifest.json              PWA 清单：名称、图标、全屏模式、主题色
├── sw.js                      Service Worker：外壳缓存、离线兜底
├── icon.svg                   图标矢量源文件（可自行修改）
├── .nojekyll                  告诉 GitHub Pages 跳过 Jekyll，直接发静态文件
├── capacitor.config.json      Android 外壳配置
├── package.json               依赖与脚本
├── scripts/
│   └── prepare-www.mjs        生成 Capacitor 用的 www/ 目录
└── .github/workflows/
    └── build-apk.yml          自动构建 Android APK
```

图标的 192 / 512 PNG 以 data URI 内嵌在 `index.html` 和 `manifest.json` 里，所以仓库中没有二进制文件，全部内容可直接用文本方式维护。`icon.svg` 是可编辑的矢量源。

---

## 五、本地开发与更新

```bash
git clone https://github.com/MANNUS-W/MANNUS-W.github.io.git
cd MANNUS-W.github.io
python -m http.server 8000
# 浏览器打开 http://localhost:8000/ （localhost 下 PWA 安装能力同样可用）
```

改完 `index.html` 后：

```bash
git add . && git commit -m "更新" && git push
```

GitHub Pages 会在约 1 分钟内自动生效，刷新 https://mannus-w.github.io/ 即可看到新版本。若页面没变，强制刷新一次（Service Worker 有缓存，改了代码记得把 `sw.js` 里的 `dailyji-v2` 版本号 +1）。

---

## 六、常见问题

**Q：打开是空白 / 样式乱了？**
先确认网址是 https 开头；再强制刷新（Ctrl+F5）。Service Worker 旧缓存可用浏览器「清除站点数据」解决。

**Q：为什么手机上没有「安装」按钮？**
PWA 安装要求 https 或 localhost。GitHub Pages 已是 https，正常会出现。iOS Safari 不显示按钮，按上面「分享 → 添加到主屏幕」操作。

**Q：APK 构建失败了？**
进 Actions 看日志。常见原因是 Android SDK 版本或 Gradle 下载超时，重跑一次通常会好。APK 是可选的，不影响网页版使用。

**Q：数据会上传到 GitHub 吗？**
不会。GitHub 只托管代码和静态页面，你的记账、习惯等数据只存在自己设备的浏览器里。

---

## 七、许可与来源

本项目由 WorkBuddy 生成，原始版本完成于 2026-11-12，2026-11-18 整理为 GitHub Pages + Capacitor 完整工程。仅用于个人生活管理，不含任何第三方追踪或数据上报。
