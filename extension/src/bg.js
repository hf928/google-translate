const env = chrome || browser;

let flag = true;

env.tabs.onCreated.addListener((tab) => checkPageHandle(tab.id));
env.tabs.onUpdated.addListener((id) => checkPageHandle(id));

function checkPageHandle (id) {

    if (flag) {

        flag = false;
        setTimeout(() => flag = true, 10);

        env.tabs.get(id, (tab) => {

            env.storage.sync.get(['translateStatus'], (result) => {

                const isActive = result.translateStatus;

                if (tab.url && tab.url.indexOf('https://www.udemy.com/course') !== -1) {

                    env.tabs.sendMessage(tab.id, { action: 'translate', status: isActive });
                   
                }

            });

        });

    }

};

const setBtnBadge = (isActive) => {

    env.action.setBadgeBackgroundColor({ color: (isActive ? '#22cc99' : '#666666') });
    env.action.setBadgeText({ text: (isActive ? 'O' : 'X') });

}

// 點擊觸發
env.action.onClicked.addListener((tab) => {
console.log(111);
    env.storage.sync.get(['translateStatus'], (result) => {
        console.log(222);

        const isActive = !result.translateStatus;

        env.storage.sync.set({ translateStatus: isActive }, () => {
            console.log(333);

            setBtnBadge(isActive);
            env.tabs.sendMessage(tab.id, { action: 'translate', status: isActive });

        });

    });

});


env.storage.sync.get(['translateStatus'], (result) => {

    setBtnBadge(result.translateStatus);

});