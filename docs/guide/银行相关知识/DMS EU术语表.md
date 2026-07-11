# DMS欧洲三国上线·中英术语精简对照表
场景：荷兰/爱尔兰/卢森堡商户收单、法国中间行集中清算、汇丰Digital Merchant Service系统架构、对接同业与监管

## 一、SEPA清算通用（三国共用，法中间行核心）
| 英文术语 | 中文释义 | 业务场景说明 |
| ---- | ---- | ---- |
| SEPA | 单一欧元支付区 | 欧元区统一清算框架，全部交易遵循ISO20022 |
| SCT | SEPA普通贷记转账 | B2B商户回款、批量付款，T+1清算 |
| SCT Inst | SEPA即时贷记转账 | 7×24实时到账，iDEAL底层通道，单笔上限€10万 |
| SDD Core | 通用SEPA直接借记 | 个人订阅扣费，消费者8周无理由拒付权 |
| SDD B2B | 企业SEPA直接借记 | B2B企业扣款，无消费者退款保护 |
| Mandate | 借记授权书 | SDD业务必备唯一授权ID，对账核心标识 |
| EPC | 欧洲支付理事会 | SEPA规则制定机构，法行清算标准来源 |
| Net Settlement / Netting | 净额轧差结算 | 法国中间行对冲三国应收应付，仅划转净额 |
| Gross Settlement | 全额逐笔结算 | 大额高优先级商户资金划拨模式 |
| Cut-off Time | 日切截单时间 | 法中间行每日清算截止时点，超期顺延起息日 |
| Value Date | 起息日 | 资金在法行同业账户实际可用、计息日期 |
| Batch File | SEPA批量清算文件 | 各国收单行每日汇总交易发送法国中间行 |
| Return / Recall | 交易退回/撤销 | 转账失败原路退回，DMS差错处理模块 |
| COR1/COR2/COR3 | SEPA更正/撤销/退回报文 | 异常交易标准ISO20022报文类型 |

## 二、法国中间行·同业结算专用（架构最高频）
| 英文术语 | 中文释义 | 业务场景说明 |
| ---- | ---- | ---- |
| Correspondent Bank | 代理行 | 本次场景法国中转清算行 |
| Intermediary Bank | 中间行 | SWIFT跨境资金中转，本场景法行兼具双角色 |
| Nostro Account | 往账 | 汇丰开立在法国中间行的欧元清算同业账户 |
| Loro / Vostro Account | 来账 | 法国行账本视角，存放汇丰头寸的账户 |
| Correspondent Agreement | 同业代理协议 | 汇丰与法国行清算、轧差、手续费正式合约 |
| Cover Payment | 头寸报 | MT202报文，同业间大额资金调拨 |
| Reconciliation Statement | 同业对账单 | 法行每日下发Nostro账户流水，三方对账数据源 |
| COBO (Collection On Behalf Of) | 代商户集中收款 | DMS核心模式，三国商户资金归集至法行 |
| POBO (Payment On Behalf Of) | 代商户集中付款 | 商户退款、分佣批量对外支付 |

## 三、荷兰/爱尔兰/卢森堡本地支付渠道
| 英文术语 | 中文释义 | 覆盖国家 |
| ---- | ---- | ---- |
| iDEAL | 荷兰网银原生支付 | 荷兰，线上主流渠道，无拒付 |
| Wero | 泛欧统一数字钱包 | 荷兰，iDEAL升级替代方案 |
| Bancontact Payconiq | 荷比卢扫码钱包 | 荷兰、卢森堡线下零售 |
| Irish FPS | 爱尔兰本地即时清算 | 爱尔兰境内小额转账 |
| Revolut Pay | 本土电子钱包支付 | 爱尔兰线上商户渠道 |
| Clearstream | 欧洲国际证券清算机构 | 卢森堡跨境B2B大额配套 |
| Laser Card | 爱尔兰本地借记卡 | 爱尔兰线下收单渠道 |

## 四、欧盟支付监管与风控合规（DMS商户准入、交易安全）
| 英文术语 | 中文释义 |
| ---- | ---- |
| PSD2 / PSD3 | 欧盟支付服务指令2/3 |
| EEA | 欧洲经济区 |
| EMI | 电子货币机构牌照 |
| PI | 支付机构牌照 |
| PISP | 支付发起服务商（网银跳转支付） |
| AISP | 账户信息查询服务商（开放银行） |
| SCA | 强客户身份验证 |
| 3DS2.2 | 三维安全认证2.2版（卡支付标准） |
| Dynamic Linking | 动态交易绑定（SCA强制要求） |
| MIT (Merchant Initiated Transaction) | 商户主动发起交易（订阅代扣） |
| SCA Exemptions | 强认证豁免规则 |
| GDPR | 通用数据保护条例 |
| AML5/AML6 | 欧盟反洗钱指令5/6 |
| KYC | 客户身份尽职调查（商户准入） |
| EDD | 强化尽职调查（高风险商户） |
| MCC | 商户行业分类码 |
| Chargeback | 交易拒付/争议退款 |
| Rolling Reserve | 滚动风险保证金 |

## 五、DMS商户收单业务架构术语（开发/账务/对账）
| 英文术语 | 中文释义 |
| ---- | ---- |
| DMS (Digital Merchant Service) | 数字化商户收单服务 |
| Acquirer / Acquiring Bank | 本地商户收单行 |
| Merchant Settlement | 商户资金结算 |
| MDR (Merchant Discount Rate) | 商户手续费扣率 |
| Interchange Fee | 卡组织交换费 |
| Auth / Capture / Refund | 授权 / 请款 / 退款（卡支付三流程） |
| Clearing | 清算（信息流轧差核对） |
| Settlement | 结算（实际资金划转） |
| Reconciliation | 交易对账 |
| Funds-in-Transit | 在途待结算资金 |
| Merchant Ledger | DMS商户分户虚拟账 |
| Unique Reconciliation ID | 全局对账流水唯一标识 |
| EIPS | European Instant Payment Scheme（欧洲即时支付方案） — 面向欧盟跨国互联的实时支付规范或实施方案，作为SEPA即时支付生态的扩展标准/实践。 |
| EVPS | Enhanced Value Processing Service（增强型价值处理服务） — 结算层的增值处理能力（如币种转换、费用拆分、清算前保序处理），用于提高DMS对复杂交易场景的支持能力。 |

## 六、报文、账户与网络通信（对接法国银行技术层）
| 英文术语 | 中文释义 |
| ---- | ---- |
| ISO 20022 | SEPA标准XML报文格式 |
| SWIFT MT Series | 传统同业报文（MT103/MT202/MT940） |
| SWIFT gpi | 全球支付创新（头寸实时追踪） |
| FileAct | SWIFT批量文件传输通道 |
| IBAN | 国际银行账号（NL/IE/LU国别前缀） |
| BIC / SWIFT Code | 银行识别码 |
| MT940 | 同业账户对账单报文 |
| MT202 | 同业头寸调拨报文 |

## 配套使用建议
1. 对内开发沟通：优先看「二、法国中间行」「六、报文通信」；
2. 和法国银行技术对接：重点Nostro、Netting、Cut-off、Value Date、ISO20022；
3. 业务合规/商户准入评审：使用第四部分监管术语；
4. 产品收银台渠道开发：查阅第三部分各国本地支付词汇。

需要我把这份表格导出成纯文本无Markdown版本，方便你复制到会议PPT或需求文档吗？
