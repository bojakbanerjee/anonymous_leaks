const SMART_CAPTCHA_MODE_TYPICAL = 'typical';
const SMART_CAPTCHA_MODE_INVISIBLE = 'invisible';

addEventListener('DOMContentLoaded', function() {
    if (techdirSmartCaptchaMode() === SMART_CAPTCHA_MODE_INVISIBLE)
    {
        const $bxCaptchaElements = document.getElementsByClassName('bx-captcha');
        if ($bxCaptchaElements.length > 0)
        {
            $bxCaptchaElements.forEach(function($bxCaptchaElement) {
                let $container = $bxCaptchaElement.closest('.bx-authform-formgroup-container');
                $container.style.display = 'none';
            });
        }
    }
});

BX.addCustomEvent('onAjaxSuccess', function(){
    if (techdirSmartCaptcha.queue.id !== undefined && techdirSmartCaptcha.queue.id.length > 0)
    {
        for (let i = 0; i < techdirSmartCaptcha.queue.id.length; i++)
        {
            techdirSmartCaptcha.render(techdirSmartCaptcha.queue.id[i]);
        }

        techdirSmartCaptcha.queue.id = [];
    }
});

addEventListener('submit', function(event) {
	if (techdirSmartCaptchaMode() === SMART_CAPTCHA_MODE_INVISIBLE)
    {
        event.preventDefault();

        let smartCaptchaId = undefined;
        let $smartCaptchaElement = event.target.getElementsByClassName('techdir-smart-captcha');
        if ($smartCaptchaElement[0] !== undefined)
        {
            $smartCaptchaElement = $smartCaptchaElement[0];
            smartCaptchaId = $smartCaptchaElement.getAttribute('smart-captcha-id');
        }

        if (smartCaptchaId !== undefined)
        {
            window.smartCaptcha.execute(smartCaptchaId);
        }
    }
});

function techdirSmartCaptchaOnloadFunction()
{
    let captchaItems = document.getElementsByClassName('techdir-smart-captcha');

    if (captchaItems.length > 0)
    {
        for (let i = 0; i < captchaItems.length; i++)
        {
            let id = undefined;

            if (captchaItems[i].attributes['id'] !== undefined)
            {
                id = captchaItems[i].attributes['id'].value;

                techdirSmartCaptcha.render(id);
            }
        }
    }
}

function techdirSmartCaptchaPushQueueId(id)
{
    techdirSmartCaptcha.queue.id.push(id);
}

function renderCallback(token)
{
	if (typeof token === 'string' && token.length > 0)
	{
		const inputToken = document.querySelector('input[value="' + token + '"]');
		const form = inputToken.closest('form');

		if (form !== undefined)
		{
			form.submit();
		}
	}
}

function techdirSmartCaptchaRender(captchaContainerId)
{
    techdirSmartCaptcha.render(captchaContainerId);
}

function techdirSmartCaptchaMode()
{
    return (typeof smartCaptchaModeGlobal === 'undefined') ? SMART_CAPTCHA_MODE_TYPICAL : smartCaptchaModeGlobal;
}

let techdirSmartCaptcha = function(){
    let queue = {
        id:  []
    };

    let render = function(captchaContainerId)
    {
        if (window.smartCaptcha)
        {
            let $container = document.getElementById(captchaContainerId);

            if ($container !== null)
            {
                let siteKey = undefined;
                let hl = undefined;

                if ($container.attributes['data-sitekey'] !== undefined)
                {
                    siteKey = $container.attributes['data-sitekey'].value
                }

                if ($container.attributes['data-hl'] !== undefined)
                {
                    hl = $container.attributes['data-hl'].value
                }

                if (siteKey !== undefined && hl !== undefined)
                {
                    if (techdirSmartCaptchaMode() === SMART_CAPTCHA_MODE_TYPICAL)
                    {
                        const smartCaptchaId = window.smartCaptcha.render($container, {
                            sitekey: siteKey,
                            hl: hl,
                        });
                    }
                    else if (techdirSmartCaptchaMode() === SMART_CAPTCHA_MODE_INVISIBLE)
                    {
                        const smartCaptchaId = window.smartCaptcha.render($container, {
                            sitekey: siteKey,
                            hl: hl,
                            invisible: true,
                            callback: renderCallback,
                        });

                        $container.setAttribute('smart-captcha-id', smartCaptchaId);
                    }
                }
            }
        }
    };

    return {
        queue: queue,
        render: function(captchaContainerId)
        {
            return render(captchaContainerId);
        }
    }
}();