export const PagetitlePlugin = function(hook, vm) {
    console.log('WTF');
    hook.doneEach(function() {
        document.title += ' | pico-js';
    });
};

export default PagetitlePlugin;