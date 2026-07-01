# 荷兰/爱尔兰/卢森堡DMS欧洲商户支付必备专业术语
适配你的场景：汇丰软件架构、三国上线、**法国银行为统一中间清算行**，分为6大模块：SEPA欧元清算、法行代理行结算、三国本地支付、欧盟监管合��[...]

## 一、SEPA 欧元清算核心（三国通用，法中间行核心承载）
三国均属于SEPA区，所有商户资金先归集至法国中间行做轧差结算，SEPA是底层标准
1. **SEPA（Single Euro Payments Area）** 单一欧元支付区，欧元统一清算框架，强制ISO20022报文
2. **SCT（SEPA Credit Transfer）** SEPA普通贷记转账（付款人主动推送资金），T+1工作日清算，商户B2B回款主力
3. **SCT Inst（SEPA Instant Credit Transfer）** SEPA即时转账，10秒到账、7×24全年无休，单笔上限€10万，荷兰iDEAL底层清算通道
4. **SDD Core（SEPA Direct Debit Core）** 个人通用直接借记，订阅/自动扣费，商户拉款模式，消费者8周无理由退款权
5. **SDD B2B** 企业专用借记，无消费者退款保护，B2B商户批量扣款
6. **Mandate** 借记授权书，SDD业务必备电子授权凭证，唯一Mandate ID用于对账
7. **EPC（European Payments Council）** 欧洲支付理事会，SEPA规则制定机构，法中间行遵循其清算规范
8. **Instant Payments Regulation（IPR）** 欧盟即时支付法规，强制欧元区银行接入SCT Inst
9. **SEPA Batch File** SEPA批量清算文件，每日由荷兰/爱尔兰/卢森堡收单行汇总发给法国中间行轧差

## 二、法国中间行（Correspondent Bank）清算/代理行专属术语（你业务最关键链路）
你的资金链路：商户收单行 → 法国中间行（代理行枢纽）→ 汇丰总行/商户结算账户，架构对账、账户记账、报文路由全部依赖以下概念
1. **Correspondent Bank 代理行** 即你场景的法国中转银行，持有双方往来账户，承担三国资金集中清算
2. **Intermediary Bank 中间行** SWIFT跨境中转行；SEPA内法国行兼具代理行+中间行双重角色
3. **Nostro Account 往账** 汇丰在法国中间行开立的欧元清算账户（我方视角：我们存在法行的钱）
4. **Loro Account 来账** 法国中间行视角，存放汇丰资金的账户（对方账本）
5. **Vostro Account 同业账户** 同Loro，欧洲银行通用叫法
6. **Correspondent Banking Agreement 代理行协议** 汇丰与法国中间行签署的清算、轧差、手续费、日切规则合同
7. **Netting / Net Settlement 轧差净额结算** 法国中间行每日对荷兰/爱尔兰/卢森堡三国交易对冲应收应付，只划转净额（降低资金占用，架构核心账务逻��[...]
8. **Gross Settlement 全额结算** 不轧差，单笔全额划拨，高价值商户通道
9. **Cut-off Time 日切截单时间** 法国中间行每日SEPA批量清算截止时点，超过则顺延下一清算日（DMS日终对账核心参数）
10. **Value Date 起息日** 资金在法国中间行账户实际计息、可用日期，区分交易日期与清算起息日
11. **Cover Payment 头寸报** SWIFT MT202头寸划拨报文，法中间行间资金调拨专用
12. **Reconciliation Statement 代理行对账单** 法国银行每日下发Nostro账户流水，DMS对账模块核心数据源
13. **Recall / Return 退回交易** SEPA转账失败，法中间行原路退回收单行，DMS差错处理模块场景

## 三、荷兰/爱尔兰/卢森堡 三国本地专属支付方式（DMS收银台渠道对接必备）
### 荷兰（电商第一渠道 iDEAL）
1. **iDEAL** 荷兰国民网银支付，70%+线上交易，银行直连、无拒付、实时确认，底层走SCT Inst清算，2026年向Wero迁移
2. **Wero** EPI欧洲统一钱包，荷兰iDEAL替代升级方案，泛欧通用
3. **Bancontact Payconiq** 荷比卢线下扫码钱包，卢森堡、荷兰线下商户高频

### 爱尔兰
1. **Revolut Pay** 爱尔兰本土电子钱包，本地C2B支付主流
2. **FPS Ireland（Irish Instant Payments）** 爱尔兰本地即时清算，爱尔兰境内小额快速转账，对接法国中间行做跨境归集
3. **Laser Card（爱尔兰本地借记卡）** 爱尔兰本土银行卡，卡收单渠道

### 卢森堡（跨境B2B商户为主）
1. **Bancontact Luxembourg** 卢森堡线下零售支付
2. **Clearstream** 卢森堡证券清算机构（高净值商户、跨境B2B大额资金配套）
3. **SEPA B2B Direct Debit** 卢森堡企业商户高频订阅扣款

### 补充：EIPS / EVPS（草稿 A）
1. **EIPS（European Instant Payment Scheme）** 欧洲即时支付方案
   - CN: 欧洲范围内推动即时支付互操作性的标准/方案，承接并推动 SCT Inst 与 EPI 的互通，侧重零售/实时清算、低时延、7×24 可用性与监管合规（与 Instant Payments Regulation、ISO20022/SEPA 即时清算相关）。
   - EN: A pan‑European instant payments scheme to enable interoperable instant euro payments, complementing SCT Inst and EPI, focusing on retail real‑time clearing, low latency, 24/7 availability and regulatory alignment (related to the Instant Payments Regulation and ISO20022).

2. **EVPS（European Value Payment Scheme）** 欧洲高价值/机构级支付通道
   - CN: 面向大额或机构级别资金划拨的支付/清算通道，支持 gross settlement（全额结算）、增强合规与可追溯性，通常与 SWIFT（MT/gpi）、Nostro/Loro 资金流与净额/全额结算模型联动，适配高价值企业/机构清算场景。
   - EN: A pan‑European clearing channel tailored for high‑value or institutional payments, supporting gross settlement, enhanced compliance and traceability, typically interoperating with SWIFT (MT/gpi), Nostro/Loro account flows and net/gross settlement models, suited for high‑value institutional clearing.

## 四、欧盟支付监管合规术语（DMS风控、客户数据、商户准入强制落地）
### 支付法规框架
1. **PSD2（Revised Payment Services Directive）** 欧盟支付服务指令2，全欧商户支付合规基石；**PSD3** 2026新版迭代，强化实时支付与反诈
2. **EEA（European Economic Area）** 欧洲经济区，荷兰/爱尔兰/卢森堡均覆盖，PSD2全域适用
3. **PI（Payment Institution）** 支付机构牌照；**EMI（Electronic Money Institution）** 电子货币牌照，欧洲商户收单主体资质
4. **PISP（Payment Initiation Service Provider）** 支付发起服务商（网银跳转支付，iDEAL底层服务商）
5. **AISP（Account Information Service Provider）** 账户信息服务商（开放银行查流水）

### 交易安全SCA（卡支付强制）
1. **SCA（Strong Customer Authentication）** 强客户身份验证，两要素认证（所知/所有/所是），欧盟线上卡支付强制
2. **3DS2.2（3-D Secure 2.2）** 卡支付SCA标准协议，DMS卡收银台对接核心接口
3. **Dynamic Linking 动态绑定** SCA强制要求：验证码绑定唯一交易金额、商户号，防篡改
4. **SCA Exemptions SCA豁免** 低额交易、白名单商户、MIT商户发起交易等免强认证场景，DMS风控模块需实现
5. **MIT（Merchant Initiated Transaction）** 商户主动发起扣款（订阅续费），豁免SCA，SDD/定期代扣核心场景

### 数据与反洗钱
1. **GDPR** 通用数据保护条例，三国商户消费者支付数据存储合规
2. **AML5/AML6** 欧盟反洗钱指令，法国中间行对跨境商户交易穿透审查
3. **KYC（Know Your Customer）** 商户准入、消费者实名核验，DMS商户管理模块
4. **EDD（Enhanced Due Diligence）** 强化尽调，高风险商户、跨境大额交易强制
5. **MCC（Merchant Category Code）** 商户行业码，风控、费率、反洗钱筛查核心标识

## 五、DMS（Digital Merchant Service）商户收单、清结算架构术语（软件架构开发核心）
面向你汇丰DMS系统设计、渠道网关、账务、对账、商户结算模块
1. **Acquirer / Acquiring Bank 收单行** 荷兰/爱尔兰/卢森堡本地商户收单银行，统一上送交易至法国中间行
2. **Merchant Settlement 商户结算** 法国中间行轧差后，将净额划付至汇丰商户备付金账户
3. **MDR（Merchant Discount Rate）** 商户扣率，卡/本地支付渠道手续费，DMS计费模块计算
4. **Interchange Fee 交换费** 发卡行-收单行之间分润，欧盟有费率上限管控
5. **Chargeback 拒付** 消费者争议退款；iDEAL无拒付，信用卡/SDD Core存在8周拒付窗口期
6. **Auth / Capture / Refund 授权/请款/退款** 卡支付三阶段核心流程（单消息/双消息报文）
7. **Clearing 清算** 信息流核对、轧差计算（法国中间行核心动作）
8. **Settlement 结算** 实际资金划拨（Nostro账户资金变动）
9. **Reconciliation 对账** 三方对账：DMS商户交易记录 ↔ 收单渠道文件 ↔ 法国中间行Nostro流水
10. **Funds-in-Transit 在途资金** 已清算但未完成法行轧差划拨的商户待结算款
11. **Rolling Reserve 滚动保证金** 风控冻结商户部分结算资金，DMS账务模块管理
12. **POBO（Payment On Behalf Of）** 代商户付款；**COBO（Collection On Behalf Of）** 代商户收款（你DMS核心业务模式，通过法国中间行集中COBO归集三国资金）
13. **Merchant Ledger 商户分户账** DMS本地商户虚拟账户体系，与法国中间行Nostro总账勾兑
14. **Transaction Reconciliation ID 对账唯一流水号** 跨渠道、法中间行报文统一关联标识

## 六、报文与网络标准（对接法国中间行、三国渠道底层通信）
1. **ISO 20022** SEPA强制XML报文标准，SCT/SDD/SCT Inst、法中间行对账文件全部采用，取代旧MT报文
2. **SWIFT MT** 跨境同业调拨报文：MT103客户转账、MT202头寸调拨（法国中间行Nostro资金划拨）、MT940账户对账单
3. **SWIFT gpi** 全球支付创新，欧元跨境头寸实时追踪，法中间行SWIFT通道标配
4. **FileAct** SWIFT批量文件传输，每日SEPA批量清算文件下发通道
5. **IBAN** 国际银行账号，SEPA唯一账户标识（荷兰NL开头、爱尔兰IE、卢森堡LU）
6. **BIC/SWIFT Code** 银行识别码，法国中间行、各国收单行路由必填
7. **COR1 / COR2 / COR3** SEPA修正、撤销、退回报文类型，差错处理接口依赖

# 架构落地重点提示（贴合你法国中间行场景）
1. 资金链路：荷兰/爱尔兰/���森堡收单行 → SEPA ISO20022批量 → 法国中间行Nostro账户轧差净额结算 → 汇丰DMS商户分户账清算
2. 核心难点词汇：**Nostro/Loro、Netting轧差、COBO代收、Value Date起息日、Cut-off日切、ISO20022 SEPA报文**，是和法国银行技术对接、对账开发最高频术语
3. 三国差异化：荷兰优先iDEAL/SCT Inst；爱尔兰侧重本地FPS+Revolut Pay；卢森堡以B2B SDD B2B为主，全部统一归集至法国中间行处理净额清算。

需要我把以上术语整理一份**架构沟通精简中英对照表**，方便你和法国中间行、欧洲业务团队开会使用吗？
