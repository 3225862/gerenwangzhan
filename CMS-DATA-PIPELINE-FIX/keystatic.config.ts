import { collection, config, fields, singleton } from '@keystatic/core';

const imageOptions = {
  directory: 'public/uploads/projects',
  publicPath: '/uploads/projects/',
};

export default config({
  storage: {
    // P0 local mode. P9 will switch this block to GitHub mode with server-only env vars.
    kind: 'local',
  },
  ui: {
    brand: { name: 'Website Studio' },
    navigation: ['homepage', 'profile', 'siteSettings', 'projects'],
  },
  collections: {
    projects: collection({
      label: '测试项目',
      slugField: 'slug',
      path: 'src/content/projects/*',
      columns: ['title', 'status', 'featured', 'draft'],
      schema: {
        title: fields.text({
          label: '标题',
          validation: { isRequired: true, length: { min: 1, max: 120 } },
        }),
        slug: fields.slug({ name: { label: '项目标题' }, slug: { label: '网址标识' } }),
        summary: fields.text({
          label: '摘要',
          multiline: true,
          validation: { isRequired: true, length: { min: 1, max: 300 } },
        }),
        body: fields.text({ label: '正文', multiline: true }),
        subtitle: fields.text({ label: '副标题' }),
        coverImage: fields.image({
          label: '封面图片',
          description: '仅允许少量 jpg/png/webp 图片；单张建议不超过 2 MB。',
          ...imageOptions,
        }),
        role: fields.text({ label: '我的角色' }),
        methods: fields.array(fields.text({ label: '技术或方法' }), { label: '技术与方法' }),
        tags: fields.array(fields.text({ label: '标签' }), { label: '标签' }),
        externalUrl: fields.text({ label: '项目链接' }),
        githubUrl: fields.text({ label: 'GitHub 链接' }),
        demoUrl: fields.text({ label: '演示链接' }),
        relatedProjects: fields.array(fields.text({ label: '项目 slug' }), { label: '相关项目' }),
        relatedArticles: fields.array(fields.text({ label: '文章 slug' }), { label: '相关文章' }),
        status: fields.select({
          label: '项目状态',
          options: [
            { label: '计划中', value: 'planned' },
            { label: '进行中', value: 'active' },
            { label: '已完成', value: 'completed' },
            { label: '暂停', value: 'paused' },
          ],
          defaultValue: 'planned',
        }),
        featured: fields.checkbox({ label: '推荐项目', defaultValue: false }),
        sortOrder: fields.integer({ label: '排序', defaultValue: 0 }),
        publishedAt: fields.date({ label: '发布日期' }),
        draft: fields.checkbox({ label: '草稿', defaultValue: true }),
        publicationStatus: fields.select({
          label: '内容状态',
          description: '选择草稿、已发布或已归档。归档内容不会出现在公开页面。',
          options: [
            { label: '草稿', value: 'draft' },
            { label: '已发布', value: 'published' },
            { label: '已归档', value: 'archived' },
          ],
          defaultValue: 'draft',
        }),
      },
    }),
    articles: collection({
      label: '文章',
      slugField: 'slug',
      path: 'src/content/articles/*',
      columns: ['title', 'category', 'draft', 'featured'],
      schema: {
        title: fields.text({ label: '标题', validation: { isRequired: true } }),
        slug: fields.slug({ name: { label: '标题' }, slug: { label: '网址标识' } }),
        summary: fields.text({ label: '摘要', multiline: true, validation: { isRequired: true } }),
        body: fields.text({ label: '正文（Markdown-compatible 文本）', multiline: true }),
        coverImage: fields.image({
          label: '封面',
          directory: 'public/uploads/articles',
          publicPath: '/uploads/articles/',
        }),
        category: fields.text({ label: '分类' }),
        tags: fields.array(fields.text({ label: '标签' }), { label: '标签' }),
        author: fields.text({ label: '作者' }),
        publishedAt: fields.date({ label: '发布日期' }),
        updatedAt: fields.date({ label: '更新日期' }),
        draft: fields.checkbox({ label: '草稿', defaultValue: true }),
        publicationStatus: fields.select({
          label: '内容状态',
          description: '选择草稿、已发布或已归档。',
          options: [
            { label: '草稿', value: 'draft' },
            { label: '已发布', value: 'published' },
            { label: '已归档', value: 'archived' },
          ],
          defaultValue: 'draft',
        }),
        featured: fields.checkbox({ label: '推荐', defaultValue: false }),
        seoTitle: fields.text({ label: 'SEO 标题' }),
        seoDescription: fields.text({ label: 'SEO 描述', multiline: true }),
        canonicalUrl: fields.text({ label: 'Canonical URL' }),
        socialImage: fields.image({
          label: '社交图片',
          directory: 'public/uploads/articles',
          publicPath: '/uploads/articles/',
        }),
      },
    }),
  },
  singletons: {
    siteSettings: singleton({
      label: '网站设置',
      path: 'src/data/site-settings',
      schema: {
        siteName: fields.text({ label: '网站名称', defaultValue: 'P2 个人网站（待替换）' }),
        siteDescription: fields.text({
          label: '网站描述',
          multiline: true,
          defaultValue: '网站描述待补充。',
        }),
        contentStatus: fields.select({
          label: '内容状态',
          options: [
            { label: '占位内容', value: 'placeholder' },
            { label: '已准备', value: 'ready' },
          ],
          defaultValue: 'placeholder',
        }),
        defaultLanguage: fields.select({
          label: '默认语言',
          options: [{ label: '中文', value: 'zh' }],
          defaultValue: 'zh',
        }),
        email: fields.text({ label: '邮箱', defaultValue: '' }),
        emailPublic: fields.checkbox({ label: '公开邮箱', defaultValue: false }),
        availableLanguages: fields.array(
          fields.select({
            label: '语言',
            options: [
              { label: '中文', value: 'zh' },
              { label: '日语', value: 'ja' },
              { label: '英语', value: 'en' },
            ],
            defaultValue: 'zh',
          }),
          { label: '预留语言' },
        ),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({ label: '名称' }),
            platform: fields.text({ label: '平台', defaultValue: 'other' }),
            url: fields.text({ label: '链接' }),
            visible: fields.checkbox({ label: '显示', defaultValue: true }),
            sortOrder: fields.integer({ label: '排序', defaultValue: 0 }),
          }),
          { label: '社交链接' },
        ),
        footerText: fields.text({ label: '页脚文字', multiline: true, defaultValue: '' }),
        resumeUrl: fields.text({ label: '简历链接', defaultValue: '' }),
        resumePublic: fields.checkbox({ label: '公开简历', defaultValue: false }),
        navigation: fields.array(
          fields.object({
            label: fields.text({ label: '名称' }),
            href: fields.text({ label: '路径或链接' }),
            visible: fields.checkbox({ label: '显示', defaultValue: true }),
            sortOrder: fields.integer({ label: '排序', defaultValue: 0 }),
          }),
          { label: '导航项' },
        ),
      },
    }),
    homepage: singleton({
      label: '首页内容',
      path: 'src/data/homepage',
      schema: {
        contentStatus: fields.select({
          label: '内容状态',
          options: [
            { label: '占位内容', value: 'placeholder' },
            { label: '已准备', value: 'ready' },
          ],
          defaultValue: 'placeholder',
        }),
        eyebrow: fields.text({ label: '眉题' }),
        heroTitle: fields.text({ label: '主标题', validation: { isRequired: true } }),
        heroDescription: fields.text({ label: '主说明', multiline: true }),
        primaryCtaLabel: fields.text({ label: '主按钮文字' }),
        primaryCtaUrl: fields.text({ label: '主按钮链接' }),
        secondaryCtaLabel: fields.text({ label: '次按钮文字' }),
        secondaryCtaUrl: fields.text({ label: '次按钮链接' }),
        heroImage: fields.image({
          label: '主视觉图片',
          directory: 'public/uploads/home',
          publicPath: '/uploads/home/',
        }),
        showHeroImage: fields.checkbox({ label: '显示主视觉图片', defaultValue: false }),
        introductionTitle: fields.text({ label: '介绍标题' }),
        introductionBody: fields.text({ label: '介绍正文', multiline: true }),
        focusAreas: fields.array(
          fields.object({
            title: fields.text({ label: '标题' }),
            description: fields.text({ label: '描述', multiline: true }),
            icon: fields.text({ label: '图标标识', defaultValue: '' }),
            visible: fields.checkbox({ label: '显示', defaultValue: true }),
            sortOrder: fields.integer({ label: '排序', defaultValue: 0 }),
          }),
          { label: '关注方向' },
        ),
        featuredProjectsLimit: fields.integer({ label: '推荐项目数量', defaultValue: 2 }),
        currentStatusTitle: fields.text({ label: '当前状态标题' }),
        currentStatusBody: fields.text({ label: '当前状态正文', multiline: true }),
        contactTitle: fields.text({ label: '联系标题' }),
        contactDescription: fields.text({ label: '联系说明', multiline: true }),
        contactCtaLabel: fields.text({ label: '联系按钮文字' }),
        contactCtaUrl: fields.text({ label: '联系按钮链接' }),
        sectionVisibility: fields.object(
          {
            introduction: fields.checkbox({ label: '显示介绍', defaultValue: true }),
            focus: fields.checkbox({ label: '显示方向', defaultValue: true }),
            featured: fields.checkbox({ label: '显示推荐项目', defaultValue: true }),
            status: fields.checkbox({ label: '显示状态', defaultValue: true }),
            contact: fields.checkbox({ label: '显示联系', defaultValue: true }),
          },
          { label: '区块显示控制' },
        ),
        sectionOrder: fields.array(
          fields.select({
            label: '区块',
            options: [
              { label: '介绍', value: 'introduction' },
              { label: '关注方向', value: 'focus' },
              { label: '推荐项目', value: 'featured' },
              { label: '当前状态', value: 'status' },
              { label: '联系', value: 'contact' },
            ],
            defaultValue: 'introduction',
          }),
          { label: '区块顺序' },
        ),
      },
    }),
    profile: singleton({
      label: '个人资料',
      path: 'src/data/profile',
      schema: {
        contentStatus: fields.select({
          label: '内容状态',
          options: [
            { label: '占位内容', value: 'placeholder' },
            { label: '已准备', value: 'ready' },
          ],
          defaultValue: 'placeholder',
        }),
        displayName: fields.text({ label: '公开称呼', validation: { isRequired: true } }),
        legalName: fields.text({ label: '法定姓名' }),
        preferredName: fields.text({ label: '偏好称呼' }),
        shortBio: fields.text({ label: '短简介', multiline: true }),
        fullBio: fields.text({ label: '完整简介（支持 Markdown 语法文本）', multiline: true }),
        location: fields.text({ label: '所在地' }),
        currentRole: fields.text({ label: '当前身份' }),
        educationSummary: fields.text({ label: '教育概览', multiline: true }),
        avatar: fields.image({
          label: '头像',
          directory: 'public/uploads/profile',
          publicPath: '/uploads/profile/',
        }),
        portrait: fields.image({
          label: '肖像',
          directory: 'public/uploads/profile',
          publicPath: '/uploads/profile/',
        }),
        email: fields.text({ label: '邮箱' }),
        resumeUrl: fields.text({ label: '简历链接' }),
        resumePublic: fields.checkbox({ label: '公开简历', defaultValue: false }),
        availabilityStatus: fields.text({ label: '当前状态' }),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({ label: '名称' }),
            platform: fields.text({ label: '平台', defaultValue: 'other' }),
            url: fields.text({ label: '链接' }),
            visible: fields.checkbox({ label: '显示', defaultValue: true }),
            sortOrder: fields.integer({ label: '排序', defaultValue: 0 }),
          }),
          { label: '社交链接' },
        ),
        interests: fields.array(
          fields.object({
            title: fields.text({ label: '标题' }),
            description: fields.text({ label: '描述', multiline: true }),
            visible: fields.checkbox({ label: '显示', defaultValue: true }),
            sortOrder: fields.integer({ label: '排序', defaultValue: 0 }),
          }),
          { label: '兴趣与方向' },
        ),
        skills: fields.array(
          fields.object({
            title: fields.text({ label: '技能' }),
            description: fields.text({ label: '说明' }),
            visible: fields.checkbox({ label: '显示', defaultValue: true }),
            sortOrder: fields.integer({ label: '排序', defaultValue: 0 }),
          }),
          { label: '技能' },
        ),
        languages: fields.array(
          fields.object({
            title: fields.text({ label: '语言' }),
            description: fields.text({ label: '熟练度' }),
            visible: fields.checkbox({ label: '显示', defaultValue: true }),
            sortOrder: fields.integer({ label: '排序', defaultValue: 0 }),
          }),
          { label: '语言' },
        ),
        philosophy: fields.text({ label: '个人理念', multiline: true }),
        futureDirection: fields.text({ label: '未来方向', multiline: true }),
        displayNamePublic: fields.checkbox({ label: '公开称呼', defaultValue: true }),
        legalNamePublic: fields.checkbox({ label: '公开法定姓名', defaultValue: false }),
        locationPublic: fields.checkbox({ label: '公开所在地', defaultValue: false }),
        emailPublic: fields.checkbox({ label: '公开邮箱', defaultValue: false }),
      },
    }),
  },
});
