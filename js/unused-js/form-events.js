// TODO: (DP) Probably revisit this class
export default function () {
    /**
     * Returns an object with references to several form components.
     *
     * @param {Event} e
     * @returns {{$form: jQuery, $contentWrapper: jQuery}}
     */
    function resolveFormElements(e) {
        // Form that is sent.
        const $form = $(`#${e.detail.id}`);

        // Form wrapper, this element wraps the "thank you" message too.
        const $contentWrapper = $form.parent('.content-wrapper');

        return {$form, $contentWrapper};
    }

    /*
     * Disable all submit buttons to avoid user clicking it over and over again.
     * The buttons will be enabled when the wpcf7submit event occurs.
     */
    // $('.wpcf7-form').on('submit', function (e) {
    //     $(this).find('input[type=submit]').attr('disabled', 'disabled');
    // });

    /*
     * Listen for the event when the form is sent, regardless of the result.
     */
    // document.addEventListener('wpcf7submit', function (e) {
    //     const {$form} = resolveFormElements(e);
    //     $form.find('input[type=submit]').removeAttr('disabled');
    // });

    /*
     * Listen for the event when the mail is sent successfully.
     */
    // document.addEventListener('wpcf7mailsent', function (e) {
    //     const {$form, $contentWrapper} = resolveFormElements(e);

    //     // Form wrapper, this element wraps the "thank you" message too.
    //     const $thankYouMessage = $contentWrapper.find('.contact-thankyou');

    //     // Fadeout the form and then fade in the "thank you" message.
    //     $form.fadeOut(250, function () {
    //         $thankYouMessage.fadeIn(250);
    //     });
    // });

    /*
     * Listen for the event when mail failed to send.
     */
    document.addEventListener('wpcf7mailfailed', function (e) {
        const {$contentWrapper} = resolveFormElements(e);
        const $errorMessage = $contentWrapper.find('.contact-fail');

        $errorMessage.fadeIn(250);
    });
}
