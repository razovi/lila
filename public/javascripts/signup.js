$(function() {
  const $form = $('#signup-form');
  const $exists = $form.find('.username-exists');

  const usernameCheck = lichess.debounce(() => {
    const name = $username.val();
    if (name.length >= 3) $.ajax({
      method: 'GET',
      url: '/player/autocomplete',
      data: {
        term: name,
        exists: 1
      },
      success(res) {
        $exists.toggle(res);
      }
    });
  }, 300);

  $username = $form.find('input[name="username"]')
    .on('change keyup paste', () => {
      $exists.hide();
      usernameCheck();
    });

  $form.on('submit', () =>
    $form.find('button.submit')
    .attr('disabled', true)
    .removeAttr('data-icon')
    .addClass('frameless')
    .html(lichess.spinnerHtml)
  );
});
window.signupSubmit = () => {
  const form = document.getElementById('signup-form');
  if (form.reportValidity()) form.submit();
}
