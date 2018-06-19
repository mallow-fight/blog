---
title: team-manage
type: manage
order: 1
---
# 团队管理

## 敏捷开发

> [参考](https://www.cnblogs.com/jetlian/p/4160113.html)

### 历史背景

- 20世纪60年代：**软件作坊**，软件规模小，以作坊式开发为主
- 70年代：**软件危机**，硬件飞速发展，软件规模和复杂度激增，引发软件危机
- 80年代：**软件过程控制**，引入成熟生产制造管理方法，以“过程为中心”分阶段来控制软件开发（瀑布模型），一定程度上缓解了软件危机
- 90年代：重型过程，软件失败的经验促使过程被不断增加约束和限制，软件开发过程日益“重型化”，开发效率降低、响应速度发慢
- 2001～今：敏捷正在流行，随着信息时代到来，需求变化更快，交付周期成为企业核心竞争力，轻量级的，更能适应变化的敏捷软件开发方法被普遍认可并迅速流行

### 宣言

- **个体和互动** 高于 流程和工具
- **工作的软件** 高于 详尽的文档
- **客户合作** 高于 合同谈判
- **响应变化** 高于 遵循计划

### 12条敏捷原则

- 我们最重要的目标，是通过持续不断地及早交付有价值的软件使客户满意
- 欣然面对需求变化，即使在开发后期也一样。为了客户的竞争优势，敏捷过程掌握变化
- 经常地交付可以工作的软件，相隔几星期或一两个月，倾向于采取较短的周期
- 业务人员和开发人员必须互相合作，项目中的每一天都不例外
- 激发个体的斗志，以他们为核心搭建项目。提供所需的环境和支援，辅以信任，从而达成目标
- 不论团队内外，传递信息效果最好效率也最高的方式是面对面交流
- 可工作的软件是进度的首要度量标准
- 敏捷过程倡导可持续开发。责任人、开发人员和用户要能够共同维持其步调稳定延续
- 坚持不懈地追求技术卓越和良好设计，敏捷能力由此增强
- 以简洁为本，它是极力减少不必要工作量的艺术
- 最好的架构、需求和设计出自与自组织团队
- 团队定期地反思如何能提供成效，并依次调整自身的举止表现

### 5个价值观

- **专注**：由于我们在一段时间内只专注于少数几件事情，所以我们可以很好地合作并获得优质的产出。我们能够更快地交付有价值的事项。
- **公开**：在团队合作中，大家都会表达我们做得如何，以及遇到的障碍。我们发现将担忧说出来是一件好事，因为只有这样才能让这些担忧及时得到解决。
- **尊重**：因为我们在一起工作，分享和成功失败，这有助于培养并加深互相之间的尊重，并帮助彼此成为值得尊重的人。
- **承诺**：由于对自己的命运有更大的掌握，我们会有更坚强的信念获得成功。
- **勇气**：因为我们不得单打独斗，我们能够感受到支持，而且掌握更多的资源。这一切赋予我们勇气去迎接更大的挑战。

## Scrum

**Scrum是跨职能团队以迭代、增量的方式开发产品或项目的一种开发框架。**

- 它把开发组织成被称为Sprint的工作周期。这些迭代每个都不超过4周（最常见的是两周），并且无间歇地相继进行。
- Sprint是受时间箱限制的，无论工作完成与否它们都会在特定日期结束，并且从不延长。
- 通常由Scrum团队来选定一个Sprint的时长，并且对于他们所有的Sprint都使用这一时长，直到这个团队能力提高，可以使用较短周期。
- 在每个Sprint的初始，跨职能团队（大约7名成员）从排好优先级的列表中选择事项（客户需求）。
- 团队对于在Sprint结尾他们相信自己可以交付哪些目标集合达成一致意见，这些交付应该是有形的并且能被真正“完成”的。
- 在Sprint过程中不可以增加新事项，Scrum在下一Sprint时才接受变化，当前这么短的一个Sprint周期里只注重于短小、清晰、相对固定的目标。
- 团队每天都进行简短会面来检验工作进程，并调整后续步骤以确保完成剩余工作。
- 在Sprint结尾，团队与利益关系人一起回顾这个Sprint，并演示所构建的产品。团队成员从中获取可以结合到下一Sprint中的反馈。
- Scrum强调在Sprint结尾产生真正“完成”了的可工作产品。在软件领域是指已经集成的、完全测试过的、已经为最终用户生成文档的、潜在可交付的系统。

Scrum框架图：

![scrum](https://images0.cnblogs.com/i/81288/201408/142347501866575.png)

### 需求分析（偏产品，开发看看也好）

- 在敏捷开发中需求分析需要全体成员参与，体现了敏捷开发的“ 个体和互动 高于 流程和工具”的价值观。好处：
  - 有助于及时发现团队成员对同一个需求理解不一致的问题
  - 有助于规避人力风险，当一个需求分析者突然请假其他人可以马上顶替他
  - 有助于全体成员能力的提升
  - 但是，开发人员和测试人员们在能力和经验方便，不足以胜任需求分析工作。这意味着还需要一个商务分析师这个角色，他带领全体成员去进行有效的需求分析。商务分析师最重要的职责就是与客户交谈，了解和分析需求。搞清楚客户到底需要什么，到底为什么需要这些东西。商业价值是商务分析师关注的最终目标。
- 软件开发所要解决的问题就是将用户需求转换为可运行的代码。
  - 需求反映的是"什么"（What）的问题，从问题解决的角度来看，要解决一个问题首先要弄清楚的是"问题"究竟是什么。
  - 开发人员在需求分析时往往易犯的一个问题是急于考虑"怎么"（How）的问题，这是设计所要解决的问题。
- 头脑风暴 + 原型设计（这一部分应该是产品职责）
  - 我们在做项目需求分析时，通过与真实用户的交流，和用户一起进行头脑风暴，并将讨论结果使用头脑风暴软件（比如：MindMapper）整理出类似如下的头脑风暴图。
    - 与用户讨论结束后，回去再通过GUI Design将头脑风暴里的内容快速做出一个原型，下次再找用户确认，经过几次反复确认修改基本可以确定一个版本。但这并不是最终的，用户的想法随时还会变，即使到开发阶段用户的需求一样会有变化，请参考敏捷原则第2条。
  - 原型图

### 用户故事

- 用户故事是描述对用户有价值的功能，好的用户故事应该包括角色、功能和商业价值三个要素。
- 格式：作为一个<角色>, 我想要<功能>, 以便于<商业价值>。一个好的用户故事包括三个要素：
  - 角色：谁要使用这个功能。
  - 功能：需要完成什么样的功能。
  - 价值：为什么需要这个功能，这个功能带来什么样的价值。
- 编写用户故事
  - 故事应该很清晰地体现对用户或客户的价值，最好的做法是让客户团队来编写故事。客户团队应包括能确定软件最终用户需求的人，可能包括测试者，产品管理者，真实用户和交互设计师。因为他们处于描述需求的最佳位置，也因为随后他们需要和开发者一同设计出故事细节并确定故事优先级。为了构造好的用户故事，我们关注六个特征。一个优秀的故事应该具备以下特点：
  ![user-story](https://images0.cnblogs.com/blog/81288/201403/020053010554587.jpg)
  - **独立的（Independent）**：我们要尽量避免故事间的相互依赖。在对故事排列优先级时，或者使用故事做计划时，故事间的相互依赖会导致工作量估算变得更加困难。通常我们可以通过两种方法来减少依赖性：1.将相互依赖的故事合并成一个大的、独立的故事；2.用一个不同的方式去分割故事。
  - **可讨论的（Negotiable）**：故事卡是功能的简短描述，细节将在客户团队和开发团队的讨论中产生。故事卡的作用是提醒开发人员和客户进行关于需求的对话，它并不是具体的需求本事。一个用户故事卡带有了太多的细节，实际上限制了和用户的沟通。
  - **对用户或客户有价值的（Valuable）**：用户故事应该很清晰地体现对用户或客户的价值，最好的做法是让客户编写故事。一旦一个客户意识到这是一个用户故事并不是一个契约而且可以进行协商的时候，他们将非常乐意写下故事。
  - **可估算的（Estimable）**：开发团队需要去估计一个用户故事以便确定优先级，工作量，安排计划。但是让开发者难以估计故事的问题来自：1.开发人员缺少领域知识；2.开发人员缺少技术知识；3.故事太大了。
  - **小的（Small）**：一个好的故事在工作量上要尽量小，最好不要超过10个理想人/天的工作量,至少要确保的是在一个迭代或Sprint中能够完成。用户故事越大，在安排计划，工作量估算等方面的风险就会越大。
  - **可测试的（Testable）**：故事必须是可测试的。成功通过测试可以证明开发人员正确地实现了故事。如果一个用户故事不能够测试，那么你就无法知道它什么时候可以完成。一个不可测试的用户故事例子：用户必须觉得软件很好用。
- 拆分故事
  - 当故事非常大时，我们将很难对它进行估计。如果故事预计在N次迭代后才进行，那么大的故事很正常。但如果估计预计在接下来的迭代中进行，那么我们就可能会对大的故事进行拆分。很大的故事基本上都能进行拆分，只要确定每个小故事都可以交付业务价值就行。注意在这里不要把故事拆分到任务，故事是可以交付的东西，是产品负责人所关心的，而任务是不可交付的东西，产品负责人对它并不关心，任务是在sprint计划会议上拆分的。
  - 分割用户故事：

    1. 按照用户故事所支持数据的边界来分割大型用户故事（例如导入GBQ文件、Excel等）。

    2. 从主用户故事中除去对例外或错误条件的处理（相当于用户的基本路径和扩展路径），从而把一个大型用户故事变小许多。

    3. 按照操作边界分割，把大型用户故事分割成独立的建立、读取、更新和删除操作（例如预算二次导入，或者新增时需要向导、规则而比较复杂时也可以单独成一个故事来描述）。

    4. 考虑去除横切考虑（例如安全处理、日志记录、错误处理等），为用户故事建立两个版本：一个具备对横切考虑的支持，另一个不具备这种支持。

    5. 考虑功能性需求和非功能性需求隔离到不同的用户故事，从而分割大型用户故事（性能）。
    在拆分故事时，我们有时也需要考虑组合故事的场景，如把bug列入产品backlog时，可以把多个类似的bug组合成一个故事。

- 怎么评定优先级
  - 最简单的方法就是问问客户最希望在下一个迭代中最想看到的是哪一些功能。从考虑的因素来看，我们可以从以下4个因素来考虑：
    1. 获取这些功能带来的经济价值，价值越高的优先级越高。
    2. 开发成本带来的影响。例如可能2个月后由于使用新技术只需要2周，而现在做需要2个月，这时可以考虑把优先级放低一些。
    3. 获取新知识的重要性。在开发中会不断的产生一些项目和产品的新知识，及早了解和开发这些新知识可以减少不确定性，所以这类功能优先级会高些。
    4. 故事之间会存在依赖关系，这时候被依赖的优先级会更高，需要先完成。
    5. 开发这些功能所减少的风险。在开发过程中，会出现进度风险、成本风险、技术风险等，对于风险越高价值越大的我们需要首先处理，对风险高价值低的要尽量避免，可以通过以下图查看确定功能优先级时综合考虑风险和价值的关系。
- 怎么进行初始评估
  - 对每个故事进行初始估计后就可以知道项目的规模。一般采用故事点来进行这类初始评估，可以通过扑克牌来进行，扑克牌点数一般有0、1/2、1、2、3、5、8、13、20、40、100、？、咖啡。首先由产品负责人对product backlog进行讲解，然后由Scrum master负责协调进行初始评估工作。敏捷估算中不是要估计绝对的时间，而是尽量确保故事之间的相对估计是准确的。由于估计是相对的，所以需要首先找打 一个基准，我们可以先找一个不是最小的，也不是最大的来作为一个基准，可以先找出一个大家认为适合分配为2点的故事。在找2点的故事时，很可能会出现大家 意见不一致的情况，这时就需要大家都分别说明自己的见解后再重新找。有了2点基准后，就可以对每个故事进行评估了，而后面的故事都可以基于以前的故事来进 行相对估计了。在估计过程中，有可能会出现大家对故事理解不一致，这时就需要返回去修改故事，确保大家理解一致。
- 优秀的用户故事准则
  - 优秀用户故事的一些准则：
    1.试着让故事的大小能够在使用后让用户感到可以去喝杯咖啡休息一下；
    2.不要让故事过早涉及用户界面；
    3.实际编写故事时，要包括用户角色；
    4.用主动语态编写故事；
    5.为单个用户编写故事；
    6.让客户编写故事，而不是开发人员；
    7.用户故事要简短，它们只是提醒开发人员和客户进行对话；
    8.不要给故事卡添加编号。

### Scrum的三种角色

在Scrum角色中包括：产品负责人（Product Owner，PO）、ScrumMaster（SM）、开发团队（Team）。

- 角色：产品负责人（PO）

  - Scrum团队只有一个产品负责人，他负责在限定期限内拟定可能的最有价值的产品。这是通过管理流向团队的产品待办事项，选择并梳理这些事项来完成的。产品负责人维护产品待办事项列表（Product Backlog），并确保大家都知道包括的内容以及优先级。产品负责人可能需要其他人的支持，但他只能是一个人。
  - 并不是所有的事情都由产品负责人一个人负责。整个Scrum团队需要让团队变得尽可能的高效，改善他们的实践、提出正确的问题、帮助产品负责人等等。开发团队决定一个Sprint要做多少事情，并负责每个Sprint产出可用的产品增量。
  - 在Scrum中，产品负责人处在一个独特的位置。产品负责人通常是离项目的“业务面”最近的人，一般由组织指派来负责“把这个产品做出来”，而且通常期望他以最好的工作成果来满足所有的利益干系人。要做到这些，产品负责人需要管理产品待办事项列表，并确保产品待办事项列表和它的进度可见。
  - 产品负责人通过选择开发团队下一步应该做什么以及要推迟什么，来权衡范围和进度，以得到尽可能好的产品。

- 角色：ScrumMaster（SM）

  - ScrumMaster是一个“仆人型领导”，帮助Scrum团队遵守他们的流程。ScrumMaster必须对Scrum框架有很好的理解并且有能力培训其他人去了解Scrum的微妙之处。
  - ScrumMaster帮助产品负责人理解如何创建和维护产品待办事项列表（Product Backlog）。为了确保团队在Sprint结束时能够完成工作，他和开发团队一起发现并实施技术实践。他和整个Scrum团队一起来演进完成的定义。
  - ScrumMaster的另一个职责是注意团队前进的障碍已被清除了。这些障碍可能来自团队的外部，比如缺乏另一个团队的支持，也可能来自内部，比如产品负责人不知道如何恰当地准备产品待办事项列表。
  - ScrumMaster培养团队的自组织能力。团队应该尽可能地独立解决问题。
  - 作为Scrum团队的教练，ScrumMaster帮助团队执行Scrum的流程。他帮助团队更好地合作，帮助他们理解Scrum框架，并且保护他们远离内部和外部干扰。他可以引导会议，帮助Scrum团队保持正确的方向，提高效率，并提升能力。
  - ScrumMaster负责确保团队内部和外部人员对Scrum有充分的理解，并保证Scrum被恰当地使用。他帮助团队之外的人理解流程，并明白和团队的哪些交互是有益的，哪些不是。
  - ScrumMaster帮助每个人改进，使团队更加高效和有价值。

- 角色：开发团队（Team）
  - 开发团队是由实现产品增量的专业人士组成，他们采用自组织的方式完成工作。对于项目而言，开发团队的成员是全职的。
  - Scrum要求开发团队成员由一批跨职能的人组成，他们拥有完成每个产品增量所需的全部技能。
  - 开发团队成员需要以自组织的方式实现Sprint目标，根据Sprint的计划完成产品增量。
  - 产品负责人准备一个有序的代办事项列表。开发团队成员共同预测在一个Sprint里能完成的工作量，并决定如何实现。

### Scrum的四种会议

- Sprint计划会（Sprint Planning）

  - 在Scrum中，Sprint计划会议有两部分：
    1. 决定需要完成哪些工作？
    2. 决定这些工作如何完成？
    第一部分：需要完成哪些工作？
    参会人员：Team、Scrum Master、Product Owner
    第一部分的会议，产品负责人向开发团队介绍排好序的产品待办事项，由整个Scrum团队共同理解这些工作。
    Sprint中需要完成的产品待办事项数目完全由开发团队决定。做多少工作只能由开发团队决定，产品负责人或任何其它人都不能给开发团队强加更多的工作量。

    第二部分：如何完成工作？
    参会人员：Team 、Scrum Master
    第二部分的会议，开发团队需要根据当前的“完成的定义”一起决定如何实现下一个产品增量。他们进行足够的设计和计划，从而有信心可以在Sprint中完成所有工作。
    决定如何完成工作是开发团队的职责，决定做什么则是产品负责人的职责。

    Sprint计划会议最终需要Scrum团队对Sprint需要完成工作的数量和复杂度达成共识，最终产生的待办事项列表就是“Sprint待办事项列表（Sprint Backlog）”。
    Sprint待办事项列表是一个需要在当前Sprint完成的且梳理过的产品待办事项，并包括了一个团队完成这些工作的计划。

- 每日站会（Daily Scrum）
  开发团队是自组织的，通过每日站会来确认他们仍然可以实现Sprint的目标。
  每一个开发团队成员需要提供以下三点信息：

  - 从昨天的站立会到现在，我完成了什么；
  - 从现在到明天的站立会，我计划完成什么；
  - 有什么阻碍了我的进展。

  每日Scrum通常不超过15分钟。
  每日Scrum中可能有简要的问题澄清和回答，但是不应该有任何话题的讨论。
  每日Scrum既不是向管理层汇报，也不是向产品负责人或者ScrumMaster汇报。它是一个开发团队内部的沟通会议，来保证他们对现状有一致的了解。
  只有Scrum团队的成员，包括ScrumMaster和产品负责人，可以在会议中发言。其他感兴趣的人可以来旁听。

- Sprint评审会（Sprint Review）
  Sprint结束时，Scrum团队和相关人员一起评审Sprint的产出。所有Scrum会议都是限定时长的，Sprint评审会议的推荐时长是Sprint中的每一周对应一个小时（比如，一个Sprint包含2个星期，则Sprint评审会议时长为2个小时）。
  每个人都可以在Sprint评审会议上发表意见。产品负责人会对未来做出最终的决定，并适当地调整产品待办事项列表（Product Backlog）。
  Sprint评审会议向每个人展示了当前产品增量的概况。通常都会在Sprint评审会议中调整产品待办事项列表。

- Sprint回顾会议（Sprint Retrospective）
  在每个Sprint结束后，Scrum团队会聚在一起开Sprint回顾会议，目的是回顾一下团队在流程、人际关系以及工具方面做得如何。团队识别出哪些做得好，哪些做得不好，并找出潜在的改进事项，为将来的改进制定计划。所有的Scrum会议都是限定时长的，Sprint回顾会议的推荐时长是Sprint中的每一周对应一个小时（译者注：比如，一个Sprint包含2个星期，则Sprint回顾会议时长为2个小时）。
  Scrum团队总是在Scrum的框架内，改进他们自己的流程。

### 为什么会出现敏捷开发

我刚开始工作的时候采用的瀑布模型，将软件生命周期划分为制定计划、需求分析、软件设计、程序编写、软件测试和运行维护等六个基本活动，并且规定了它们自上而下、相互衔接的固定次序，如同瀑布流水，逐级下落。

瀑布（/pubu/）模型
缺点：
- 不适应用户需求变化，软件开发中用户需求发生变化真的太多了。
- 项目有风险，由于开发模型是线性的，用户只有等到整个过程的末期才能见到开发成果。
- 一个项目周期太长，就会不适应市场变化。

## 迭代节奏 - YTX

refine + plan 不能超过1个半小时
refine中的需求要明确，不明确的会后讨论，plan中的需求要确定

每天下班前跟进团队进度，跟测试沟通还有哪些bug
早会首先说今天要做的事，测试汇报昨天的bug和问题

提前做好发布生产的准备，比如发布服务，静态资源整理，微信相关的配置好后台