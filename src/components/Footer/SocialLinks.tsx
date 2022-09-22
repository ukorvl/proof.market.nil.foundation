import { ReactElement } from 'react';
import { Icon } from '@nilfoundation/react-components';

const links = [
    {
        icon: 'twitter',
        url: 'https://twitter.com/nil_foundation',
    },
    {
        icon: 'linkedin',
        url: 'https://www.linkedin.com/company/nil-foundation',
    },
    {
        icon: 'github',
        url: 'http://github.com/nilfoundation',
    },
    {
        icon: 'telegram',
        url: 'https://t.me/nilfoundation',
    },
    {
        icon: 'discord',
        url: 'https://discord.gg/KmTAEjbmM3',
    }
];

export const SocialLinks = (): ReactElement =>
    <ul className="socialLinks">
        {links.map(({icon, url}) =>
        <li key={icon}>
            <a href={url}>
                <Icon
                    iconName={`fa-brands fa-${icon}`}
                    srOnlyText={`${icon} link`}
                />
            </a>
        </li>)}
    </ul>;
