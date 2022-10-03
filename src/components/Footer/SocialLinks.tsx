import { ReactElement } from 'react';
import { Icon } from '@nilfoundation/react-components';
import { socialLinks } from '../../constants';

export const SocialLinks = (): ReactElement => (
    <ul className="socialLinks">
        {socialLinks.map(({ icon, url }) => (
            <li key={icon}>
                <a href={url}>
                    <Icon
                        iconName={`fa-brands fa-${icon}`}
                        srOnlyText={`${icon} link`}
                    />
                </a>
            </li>
        ))}
    </ul>
);
