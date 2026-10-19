/* ========================================
   MYTHOS - MYTHOLOGY PAGE
======================================== */

/* 신화 이야기 데이터 */
const mythologStories = {
    zeus: {
        number: "01",
        category: "OLYMPIAN GODS",
        title: "제우스",
        subtitle: "ZEUS · 신들의 왕",
        image: "image/artspace03.jpg",
        tags: ["올림포스", "번개", "권능", "티타노마키아"],
        story: `
            <p class="mytholog-story-lead">
                모든 것을 삼키려 했던 아버지의 두려움에서,
                새로운 세계의 지배자가 탄생했다.
            </p>

            <h3>01. 예언을 두려워한 크로노스</h3>
            <p>
                태초의 세계에서 티탄족의 왕 크로노스는 강력한 권력을
                손에 넣었다. 그러나 그에게도 피할 수 없는 두려움이
                있었다. 자신의 자식 가운데 하나가 언젠가 왕좌를 빼앗으리라는
                예언이었다. 크로노스는 그 운명을 피하기 위해 아내 레아가
                아이를 낳을 때마다 그들을 삼켜 버렸다.
            </p>
            <p>
                자식을 잃는 고통을 견딜 수 없었던 레아는 막내아들 제우스가
                태어나자 계략을 세웠다. 그녀는 아기 대신 포대기에 싼 돌을
                크로노스에게 건넸고, 크로노스는 속임수를 알아차리지 못한 채
                그것을 삼켰다. 제우스는 크레타섬에서 비밀리에 성장하며
                언젠가 아버지의 지배를 끝낼 운명을 준비하게 된다.
            </p>

            <h3>02. 티탄들과의 전쟁</h3>
            <p>
                성인이 된 제우스는 메티스의 도움을 받아 크로노스가 삼켰던
                자식들을 토해 내게 했다고 전해진다. 헤스티아, 데메테르,
                헤라, 하데스, 포세이돈이 다시 세상으로 나왔고, 형제들은
                제우스와 힘을 합쳤다.
            </p>
            <p>
                이들은 오랫동안 세계를 지배해 온 티탄들과 전쟁을 벌였다.
                이 거대한 전쟁은 티타노마키아라고 불린다. 제우스는
                키클롭스와 헤카톤케이레스의 힘까지 얻어 마침내 전쟁에서
                승리했고, 새로운 신들의 시대를 열었다.
            </p>

            <h3>03. 올림포스의 왕</h3>
            <p>
                전쟁이 끝난 뒤 제우스와 형제들은 세계의 영역을 나누었다.
                제우스는 하늘을, 포세이돈은 바다를, 하데스는 지하세계를
                맡게 되었다. 제우스는 올림포스산을 중심으로 신들의 질서를
                다스리는 왕이 되었다.
            </p>
            <p>
                그의 손에 들린 번개는 단순한 무기가 아니었다. 그것은
                권위와 심판, 그리고 세계의 질서를 지키는 힘을 상징했다.
                제우스는 맹세와 환대의 수호자로도 여겨졌지만, 자신의 욕망과
                분노로 수많은 갈등을 일으키는 존재로 묘사되기도 한다.
            </p>

            <h3>04. 신들의 왕이 남긴 의미</h3>
            <p>
                제우스의 이야기는 단순히 강한 신이 왕좌를 차지했다는
                이야기에서 끝나지 않는다. 아버지의 권력을 무너뜨린 그는
                새로운 질서를 세웠지만, 그 자신 역시 권력과 예언,
                운명의 영향에서 완전히 자유롭지는 못했다.
            </p>
            <p>
                고대 그리스인들에게 제우스는 자연의 압도적인 힘이자
                사회적 질서의 수호자였다. 동시에 그의 이야기는 권력을 가진
                존재도 두려움과 욕망을 지닌다는 사실을 보여준다.
            </p>
        `
    },

    persephone: {
        number: "02",
        category: "LOVE & FATE",
        title: "페르세포네",
        subtitle: "PERSEPHONE · 봄과 지하세계",
        image: "image/artspace04.jpg",
        tags: ["계절", "데메테르", "하데스", "생명"],
        story: `
            <p class="mytholog-story-lead">
                꽃이 피어나는 계절과 모든 것이 잠드는 계절.
                한 여신의 여정은 세상의 순환을 설명하는 이야기가 되었다.
            </p>

            <h3>01. 꽃이 가득한 들판</h3>
            <p>
                페르세포네는 곡식과 대지의 풍요를 관장하는 여신
                데메테르의 딸이었다. 그녀는 들판에서 꽃을 꺾으며
                친구들과 시간을 보내곤 했다. 세상은 햇살과 꽃으로 가득했고,
                대지는 생명력을 잃지 않는 듯 보였다.
            </p>
            <p>
                그러나 어느 날, 페르세포네가 아름다운 꽃을 발견하고
                손을 뻗는 순간 땅이 갈라졌다. 지하세계의 왕 하데스가
                나타나 그녀를 자신의 왕국으로 데려갔다. 이 사건은
                평온했던 세계에 깊은 상실을 가져왔다.
            </p>

            <h3>02. 딸을 찾아 헤매는 데메테르</h3>
            <p>
                딸이 사라진 것을 알게 된 데메테르는 횃불을 들고
                세상을 떠돌며 페르세포네를 찾아 헤맸다. 하지만 딸의
                행방을 쉽게 알아낼 수 없었다. 슬픔에 잠긴 데메테르는
                자신의 풍요로운 힘을 거두었고, 들판에서는 곡식이 자라지
                않으며 땅은 점점 메말라 갔다.
            </p>
            <p>
                인간들은 굶주림에 시달렸고, 신들의 세계에도 위기가
                찾아왔다. 마침내 제우스는 더 이상 상황을 외면할 수 없게
                되었고, 페르세포네가 지상으로 돌아올 수 있도록
                해결책을 마련하려 했다.
            </p>

            <h3>03. 석류의 씨앗</h3>
            <p>
                지하세계에서 페르세포네는 석류를 먹었다고 전해진다.
                지하세계의 음식을 먹은 자는 그곳과 영원히 인연을 맺게
                된다는 규칙이 있었다. 그래서 페르세포네는 어머니의 곁으로
                완전히 돌아갈 수 없게 되었다.
            </p>
            <p>
                여러 전승에서 그녀가 지하세계에 머무는 기간과 지상에
                돌아오는 기간은 다르게 묘사된다. 널리 알려진 이야기에서는
                그녀가 한 해의 일부를 하데스와 함께 지하세계에서 보내고,
                나머지 기간에는 데메테르에게 돌아온다.
            </p>

            <h3>04. 계절의 탄생</h3>
            <p>
                페르세포네가 지상으로 돌아오면 데메테르는 기쁨을 되찾고
                대지는 다시 푸르게 변한다. 꽃이 피고 곡식이 자라며
                세상에는 봄과 여름의 생명력이 찾아온다. 반대로 딸이
                지하세계로 떠나면 대지는 풍요를 잃고 추운 계절을 맞이한다.
            </p>
            <p>
                이 이야기는 자연의 순환을 설명하는 동시에 사랑하는 이를
                잃은 슬픔과 다시 만나는 기쁨을 함께 담고 있다.
                페르세포네는 봄의 여신인 동시에 지하세계의 여왕이다.
                그녀의 두 가지 모습은 삶과 죽음, 상실과 회복이
                서로 이어져 있음을 보여준다.
            </p>
        `
    },

    heracles: {
        number: "03",
        category: "HEROES",
        title: "헤라클레스",
        subtitle: "HERACLES · 위대한 영웅",
        image: "image/artspace05.jpg",
        tags: ["12가지 과업", "용기", "시련", "영웅"],
        story: `
            <p class="mytholog-story-lead">
                가장 강한 힘을 가진 영웅도 고통과 잘못을 피할 수는 없었다.
                헤라클레스의 위대한 업적은 속죄의 여정에서 시작되었다.
            </p>

            <h3>01. 신과 인간 사이에서 태어난 영웅</h3>
            <p>
                헤라클레스는 제우스와 인간 여성 알크메네 사이에서 태어났다.
                제우스의 아들이라는 사실은 그에게 비범한 힘을 주었지만,
                동시에 신들의 질투와 갈등 속으로 그를 끌어들였다.
                특히 제우스의 아내 헤라는 헤라클레스를 적대했다.
            </p>
            <p>
                전승에 따르면 헤라는 어린 헤라클레스를 해치기 위해
                뱀을 보냈지만, 아기는 놀라운 힘으로 뱀을 물리쳤다.
                이 사건은 훗날 수많은 괴물과 맞서게 될 영웅의
                특별한 운명을 예고하는 이야기로 전해진다.
            </p>

            <h3>02. 피할 수 없었던 비극</h3>
            <p>
                헤라클레스의 삶은 승리만으로 이루어지지 않았다.
                일부 전승에서는 헤라가 그에게 광기를 일으켜
                가족을 해치는 비극이 벌어졌다고 이야기한다.
                정신을 되찾은 헤라클레스는 자신이 저지른 일에
                깊은 고통과 죄책감을 느끼게 된다.
            </p>
            <p>
                그는 자신의 죄를 속죄하기 위해 델포이의 신탁을 찾았고,
                티린스의 왕 에우리스테우스가 내리는 과업을 수행하게 된다.
                이렇게 헤라클레스의 유명한 열두 과업이 시작되었다.
            </p>

            <h3>03. 열두 가지 과업</h3>
            <p>
                첫 번째 과업은 네메아의 사자를 처치하는 일이었다.
                사자의 가죽은 무기로 뚫을 수 없을 만큼 단단했지만,
                헤라클레스는 맨손으로 사자를 제압하고 그 가죽을
                자신의 상징으로 삼았다.
            </p>
            <p>
                이후 그는 여러 머리를 지닌 히드라와 싸우고,
                빠르게 달리는 암사슴을 붙잡으며, 거대한 멧돼지를
                생포했다. 또 아우게이아스의 외양간을 청소하고,
                스팀팔로스의 새들을 몰아내는 등 인간의 능력만으로는
                불가능해 보이는 임무들을 하나씩 완수했다.
            </p>
            <p>
                과업은 점점 더 위험해졌다. 헤라클레스는 크레타의 황소와
                디오메데스의 암말, 아마존의 여왕 히폴리테와 관련된
                임무를 수행했고, 게리온의 소를 데려오기도 했다.
                마지막에는 헤스페리데스의 황금 사과를 얻고,
                지하세계로 내려가 케르베로스를 지상으로 데려오는
                임무까지 완수했다.
            </p>

            <h3>04. 힘을 넘어선 영웅성</h3>
            <p>
                열두 과업은 단순한 괴물 사냥의 기록이 아니다.
                헤라클레스는 매번 자신의 한계를 넘어야 했고,
                때로는 힘만으로 해결할 수 없는 문제 앞에서
                지혜와 인내를 발휘해야 했다.
            </p>
            <p>
                후대의 전승에서 헤라클레스는 죽음 이후 신들의 세계에
                받아들여져 불멸성을 얻은 존재로 묘사된다.
                그의 이야기는 인간이 겪는 고통과 잘못이 삶의 끝을
                결정하는 것은 아니며, 책임을 받아들이고 시련을
                견디는 과정 또한 영웅의 일부임을 보여준다.
            </p>
        `
    },

    medusa: {
        number: "04",
        category: "MONSTERS",
        title: "메두사",
        subtitle: "MEDUSA · 시선의 저주",
        image: "image/artspace06.jpg",
        tags: ["고르곤", "페르세우스", "석화", "운명"],
        story: `
            <p class="mytholog-story-lead">
                한 번 마주친 시선은 돌이 되고,
                한 번 잘린 머리조차 강력한 힘을 잃지 않았다.
            </p>

            <h3>01. 고르곤의 얼굴</h3>
            <p>
                메두사는 그리스 신화에 등장하는 고르곤 가운데 하나다.
                그녀는 머리카락 대신 뱀이 꿈틀거리는 모습으로 표현되며,
                그녀의 눈을 직접 바라본 사람은 돌로 변한다고 전해진다.
                메두사는 고대 그리스 미술에서 공포와 위험을 나타내는
                강렬한 이미지로 자주 등장했다.
            </p>
            <p>
                메두사의 기원에 관해서는 여러 전승이 존재한다.
                일부 이야기에서는 그녀를 처음부터 괴물의 모습으로
                태어난 존재로 묘사하지만, 후대의 유명한 이야기에서는
                인간 여성으로서의 과거와 비극적인 변화를 강조한다.
            </p>

            <h3>02. 아테나와 신전의 이야기</h3>
            <p>
                오비디우스의 《변신 이야기》에 전해지는 이야기에서는
                메두사가 한때 아름다운 머리카락을 지닌 여성이었다고
                묘사된다. 포세이돈과 관련된 사건 이후 아테나의 신전에서
                벌어진 일 때문에 메두사는 끔찍한 모습으로 변하게 된다.
            </p>
            <p>
                이 이야기는 고대의 신화가 시대와 작가에 따라 어떻게
                달라지는지를 보여주는 사례다. 메두사는 단순한 괴물로
                그려지기도 하지만, 후대의 해석에서는 신들의 권력 아래
                고통을 겪은 존재로 다시 읽히기도 한다.
            </p>

            <h3>03. 페르세우스의 임무</h3>
            <p>
                영웅 페르세우스는 메두사의 머리를 가져오라는 임무를
                받는다. 그러나 메두사의 눈을 직접 바라보면 돌이 될 수
                있었기에 정면으로 맞서는 것은 불가능에 가까웠다.
            </p>
            <p>
                아테나는 빛나는 방패를 주었고, 페르세우스는 그 방패에
                비친 모습을 거울처럼 이용했다. 그는 메두사의 시선을
                직접 마주하지 않은 채 접근해 그녀의 머리를 베었다.
                이후 페르세우스는 메두사의 머리를 이용해 여러 적을
                물리쳤다고 전해진다.
            </p>

            <h3>04. 공포에서 상징으로</h3>
            <p>
                메두사의 머리는 잘린 뒤에도 적을 돌로 만드는 힘을
                유지했다. 그래서 고대 그리스에서는 메두사의 얼굴을
                방패나 건축물에 새겨 악한 힘을 물리치는 상징으로
                사용하기도 했다.
            </p>
            <p>
                오늘날 메두사는 공포와 아름다움, 피해와 저항,
                시선과 권력의 관계를 생각하게 하는 인물로도 해석된다.
                그녀의 이야기가 여러 시대의 예술가들에게 반복해서
                영감을 주는 이유는 하나의 모습으로만 설명하기 어려운
                복합적인 의미를 지니고 있기 때문이다.
            </p>
        `
    },

    narcissus: {
        number: "05",
        category: "LOVE & FATE",
        title: "나르키소스",
        subtitle: "NARCISSUS · 물에 비친 얼굴",
        image: "image/artspace07.jpg",
        tags: ["자아", "반영", "에코", "운명"],
        story: `
            <p class="mytholog-story-lead">
                그는 세상에서 가장 아름다운 얼굴을 발견했다.
                그러나 그 얼굴은 끝내 그에게 대답하지 않았다.
            </p>

            <h3>01. 아름다운 청년</h3>
            <p>
                나르키소스는 빼어난 아름다움을 지닌 청년이었다.
                많은 이들이 그에게 사랑을 고백했지만, 그는 누구의
                마음에도 쉽게 응답하지 않았다. 자신에게 다가오는
                사람들의 마음을 외면한 채 홀로 지내는 편을 택했다.
            </p>
            <p>
                그를 사랑했던 이들 가운데는 님프 에코도 있었다.
                에코는 자신의 목소리로 자유롭게 말할 수 없는 저주를
                받아 다른 사람이 한 말의 마지막 부분만 반복할 수 있었다.
                그녀는 마음을 표현하려 했지만, 나르키소스는
                그녀의 사랑을 받아들이지 않았다.
            </p>

            <h3>02. 연못에 비친 모습</h3>
            <p>
                나르키소스가 다른 이들의 마음을 거부하자 그를 지켜보던
                존재들은 그가 자신과 같은 고통을 경험하게 되기를 바랐다.
                전승에 따라 다르게 전해지지만, 그는 어느 날 맑고 고요한
                연못에 다가가 물속에 비친 자신의 모습을 보게 된다.
            </p>
            <p>
                그는 물속의 얼굴이 자신이라는 사실을 알아차리지 못한 채
                그 아름다운 모습을 사랑하게 된다. 손을 뻗으면 형상은
                흩어지고, 입맞춤하려 다가가면 물결이 일어 얼굴이 사라졌다.
                그가 가까이 다가갈수록 자신이 원하는 모습은
                붙잡을 수 없는 존재가 되었다.
            </p>

            <h3>03. 이루어질 수 없는 사랑</h3>
            <p>
                나르키소스는 연못을 떠나지 못했다. 그는 자신이 사랑하는
                존재가 자신과 분리될 수 없다는 사실을 이해하지 못한 채
                끝없는 갈망에 사로잡혔다. 손에 넣을 수 없는 사랑은
                점점 그를 쇠약하게 만들었다.
            </p>
            <p>
                결국 나르키소스는 연못 곁에서 생을 마감했다고 전해진다.
                그가 사라진 자리에는 나르키소스라는 이름의 꽃이
                피어났다고 한다. 이 결말은 자기 자신에 대한 집착이
                어떻게 고립과 상실로 이어질 수 있는지를 보여준다.
            </p>

            <h3>04. 거울 속의 나</h3>
            <p>
                나르키소스의 이야기는 고대부터 자기애와 욕망,
                아름다움에 대한 집착을 생각하게 하는 이야기로 읽혀 왔다.
                그가 사랑한 것은 실제로 대화하고 관계를 맺을 수 있는
                다른 존재가 아니라, 물 위에 비친 자신의 형상이었다.
            </p>
            <p>
                이 신화는 자신을 바라보는 일과 자신에게 갇히는 일의
                차이를 묻는다. 타인을 이해하지 못한 채 자기 모습에만
                몰두할 때, 사랑은 관계가 아니라 끝없이 반복되는
                갈망이 될 수 있다는 메시지를 전한다.
            </p>
        `
    },

    odysseus: {
        number: "06",
        category: "HEROES",
        title: "오디세우스",
        subtitle: "ODYSSEUS · 귀환의 여정",
        image: "image/artspace08.jpg",
        tags: ["오디세이아", "지혜", "모험", "귀향"],
        story: `
            <p class="mytholog-story-lead">
                전쟁에서 승리하는 것만으로는 충분하지 않았다.
                진정한 모험은 집으로 돌아가는 길에서 시작되었다.
            </p>

            <h3>01. 트로이를 떠나다</h3>
            <p>
                오디세우스는 이타카의 왕이자 뛰어난 지략을 지닌 영웅이다.
                트로이 전쟁에서 그는 목마를 이용한 계략과 기지로
                중요한 역할을 했다고 전해진다. 오랜 전쟁이 끝나자
                그는 아내 페넬로페와 아들 텔레마코스가 기다리는
                고향으로 돌아가려 했다.
            </p>
            <p>
                그러나 바다의 신 포세이돈과 얽힌 갈등을 비롯한 여러
                사건이 그의 귀향을 가로막았다. 오디세우스와 동료들은
                익숙한 세계를 벗어나 낯선 섬과 위험한 바다를
                지나야 했다.
            </p>

            <h3>02. 키클롭스의 동굴</h3>
            <p>
                여정 중 오디세우스와 동료들은 외눈박이 거인
                폴리페모스의 동굴에 갇히게 된다. 폴리페모스는
                동료들을 해치고 출구를 거대한 바위로 막아 버렸다.
                힘으로는 동굴을 빠져나갈 수 없었던 오디세우스는
                지혜를 이용해 탈출 계획을 세운다.
            </p>
            <p>
                그는 자신의 이름을 '아무도 아닌 자'라고 소개해
                거인을 속였고, 기회를 잡아 폴리페모스를 눈멀게 했다.
                이후 동료들과 함께 양들의 배 아래에 몸을 숨겨
                동굴을 빠져나왔다. 그러나 탈출에 성공한 뒤 자신의
                이름을 밝힌 행동은 폴리페모스가 포세이돈에게
                복수를 기원하게 만드는 계기가 되었다.
            </p>

            <h3>03. 세이렌과 바다의 위험</h3>
            <p>
                오디세우스의 여정에는 아름다운 노래로 항해자들을
                유혹하는 세이렌도 등장한다. 그들의 노래를 들은
                사람들은 위험을 잊고 배를 몰아 파멸에 이르곤 했다.
            </p>
            <p>
                오디세우스는 세이렌의 노래를 듣고 싶어 했다.
                그래서 동료들의 귀를 밀랍으로 막게 하고, 자신은
                배의 돛대에 단단히 묶이도록 명령했다. 노래에 매혹되어
                풀어 달라고 애원하더라도 자신을 풀지 말라고 당부했다.
                그는 호기심을 포기하지 않으면서도 위험을 피할 방법을
                마련한 것이다.
            </p>

            <h3>04. 기다림과 귀환</h3>
            <p>
                오디세우스의 여정은 수많은 상실을 동반했다.
                동료들은 하나둘 사라졌고, 그는 오랜 세월 고향으로
                돌아가지 못했다. 한편 이타카에서는 페넬로페가 남편이
                돌아오기를 기다리는 동안 수많은 구혼자들의 압박을
                견디고 있었다.
            </p>
            <p>
                마침내 오디세우스는 이타카에 도착한다. 그는 자신의
                정체를 감춘 채 궁전의 상황을 살피고, 아들 텔레마코스와
                힘을 합쳐 구혼자들에게 맞선다. 이후 페넬로페와
                재회하며 긴 귀향의 여정을 마무리한다.
            </p>

            <h3>05. 집으로 돌아간다는 것</h3>
            <p>
                호메로스의 서사시 《오디세이아》는 전쟁 영웅의
                모험담이면서 동시에 집과 가족, 정체성을 되찾는
                이야기다. 오디세우스는 강한 힘만으로 모든 위기를
                해결하지 않는다. 그는 상황을 읽고 기다리며,
                때로는 자신의 욕망을 통제해야 했다.
            </p>
            <p>
                그의 여정은 목적지에 도착하는 것만큼 그 과정에서
                무엇을 잃고 무엇을 지켜 냈는지가 중요하다는 사실을
                보여준다. 오디세우스에게 귀향은 단순히 고향 땅을
                밟는 일이 아니라, 자신이 누구이며 어디에 속하는지를
                다시 확인하는 과정이었다.
            </p>
        `
    }
};


/* ========================================
   1. 모바일 메뉴
======================================== */

function initMythologMobileMenu() {
    const menuToggle = document.getElementById("mytholog-menu-toggle");
    const gnb = document.getElementById("mytholog-gnb");

    if (!menuToggle || !gnb) return;

    menuToggle.addEventListener("click", function () {
        const isOpen = gnb.classList.toggle("is-open");

        menuToggle.classList.toggle("is-active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    gnb.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            gnb.classList.remove("is-open");
            menuToggle.classList.remove("is-active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


/* ========================================
   2. 신화 카드 필터
======================================== */

function initMythologFilter() {
    const filterButtons = document.querySelectorAll(".mytholog-filter-btn");
    const storyCards = document.querySelectorAll(".mytholog-story-card");
    const storyCount = document.getElementById("mytholog-story-count");
    const emptyMessage = document.getElementById("mytholog-story-empty");
    const resetButton = document.getElementById("mytholog-story-reset");

    if (!filterButtons.length || !storyCards.length) return;

    function filterStories(category) {
        let visibleCount = 0;

        storyCards.forEach(function (card) {
            const cardCategory = card.dataset.category;
            const isVisible =
                category === "all" || cardCategory === category;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        filterButtons.forEach(function (button) {
            const isActive = button.dataset.category === category;

            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        if (storyCount) {
            storyCount.textContent = String(visibleCount);
        }

        if (emptyMessage) {
            emptyMessage.hidden = visibleCount !== 0;
        }
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterStories(button.dataset.category || "all");
        });
    });

    if (resetButton) {
        resetButton.addEventListener("click", function () {
            filterStories("all");
        });
    }

    filterStories("all");
}


/* ========================================
   3. 신화 상세 모달
======================================== */

function initMythologStoryModal() {
    const modal = document.getElementById("mytholog-story-modal");

    if (!modal) {
        console.error(
            "MYTHOLOGY 모달을 찾을 수 없습니다. HTML에서 id를 확인하세요."
        );
        return;
    }

    const modalImage = document.getElementById("mytholog-modal-image");
    const modalNumber = document.getElementById("mytholog-modal-number");
    const modalCategory = document.getElementById("mytholog-modal-category");
    const modalTitle = document.getElementById("mytholog-modal-title");
    const modalSubtitle = document.getElementById("mytholog-modal-subtitle");
    const modalStory = document.getElementById("mytholog-modal-story");
    const modalTags = document.getElementById("mytholog-modal-tags");

    let previousFocus = null;

    function openModal(storyKey) {
        const story = mythologStories[storyKey];

        if (!story) {
            console.error("신화 데이터를 찾을 수 없습니다:", storyKey);
            return;
        }

        previousFocus = document.activeElement;

        if (modalImage) {
            modalImage.src = story.image;
            modalImage.alt = story.title;
        }

        if (modalNumber) {
            modalNumber.textContent = story.number;
        }

        if (modalCategory) {
            modalCategory.textContent = story.category;
        }

        if (modalTitle) {
            modalTitle.textContent = story.title;
        }

        if (modalSubtitle) {
            modalSubtitle.textContent = story.subtitle;
        }

        if (modalStory) {
            modalStory.innerHTML = story.story;
        }

        if (modalTags) {
            modalTags.replaceChildren();

            story.tags.forEach(function (tagText) {
                const tag = document.createElement("span");
                tag.className = "mytholog-modal-tag";
                tag.textContent = tagText;
                modalTags.appendChild(tag);
            });
        }

        modal.hidden = false;
        modal.classList.add("is-open");
        document.body.classList.add("mytholog-modal-open");

        const closeButton = modal.querySelector("[data-mytholog-close]");

        if (closeButton) {
            closeButton.focus();
        }

        console.log("신화 모달 열림:", story.title);
    }

    function closeModal() {
        if (modal.hidden) return;

        modal.hidden = true;
        modal.classList.remove("is-open");
        document.body.classList.remove("mytholog-modal-open");

        if (previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus();
        }

        console.log("신화 모달 닫힘");
    }

    /*
     * 카드 버튼뿐 아니라 data-mytholog-story 속성이 있는
     * 다른 버튼도 클릭 이벤트를 처리한다.
     */
    document.addEventListener("click", function (event) {
        const openButton = event.target.closest("[data-mytholog-story]");

        if (openButton) {
            event.preventDefault();

            const storyKey = openButton.dataset.mythologStory;
            openModal(storyKey);
            return;
        }

        const closeButton = event.target.closest("[data-mytholog-close]");

        if (closeButton) {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modal.hidden) {
            closeModal();
        }
    });
}


/* ========================================
   4. 히어로 버튼
======================================== */

function initMythologHeroButton() {
    const heroButton = document.querySelector(".mytholog-hero-btn");
    const collection = document.getElementById("mytholog-collection");

    if (!heroButton || !collection) return;

    heroButton.addEventListener("click", function (event) {
        event.preventDefault();

        collection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}


/* ========================================
   5. 페이지 초기화
======================================== */

function initMythologPage() {
    initMythologMobileMenu();
    initMythologFilter();
    initMythologStoryModal();
    initMythologHeroButton();

    console.log("MYTHOLOGY 페이지 JavaScript 실행 완료");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMythologPage);
} else {
    initMythologPage();
}