import { Command as CommandPrimitive } from 'cmdk';
import { FC } from 'react';

import { ScrollArea } from '@smartcoorp/ui/scroll-area';

import { Styled as S } from './command.styles';
import type { CommandProps, DefaultCommandItemProps } from './command.types';

export const Command: FC<CommandProps> = ({
  children,
  size = 'medium',
  sizeConfined,
  sizeWide,
  className,
  label,
  inputPlaceholder,
  ...props
}) => {
  return (
    <S.CommandContainer
      $size={size}
      $sizeConfined={sizeConfined}
      $sizeWide={sizeWide}
      className={className}
    >
      <CommandPrimitive label={label} {...props}>
        <div cmdk-input-wrapper="">
          <S.SearchIcon size={20} />
          <CommandPrimitive.Input placeholder={inputPlaceholder} autoFocus />
        </div>
        <ScrollArea maxHeight={300}>
          <CommandPrimitive.List>
            <CommandPrimitive.Empty>No results found</CommandPrimitive.Empty>
            {children}
          </CommandPrimitive.List>
        </ScrollArea>
      </CommandPrimitive>
    </S.CommandContainer>
  );
};

export const CommandGroup = CommandPrimitive.Group;
export const CommandItem = CommandPrimitive.Item;
export const CommandSeparator = CommandPrimitive.Separator;
const keyMapping: Record<string, string> = {
  '&#8984;': 'meta',
  '&#8593;': 'arrowup',
  '&#8595;': 'arrowdown',
  '&#8592;': 'arrowleft',
  '&#8594;': 'arrowright',
};

export const DefaultCommandItemContent: React.FC<DefaultCommandItemProps> = ({
  label,
  command,
  icon,
  onCommandPress,
  size = 'medium',
  sizeConfined,
  sizeWide,
}) => {
  // const commandKeyCodes = useMemo(
  //   () => command?.map((key) => keyMapping[key] || key.toLowerCase()),
  //   [command]
  // );

  // useEffect(() => {
  //   if (command && onCommandPress) {
  //     const handleKeyDown = (e: KeyboardEvent) => {
  //       const isMetaKeyPressed = e.ctrlKey || e.metaKey;
  //       const key = keyMapping[e.key.toLowerCase()] ?? e.key.toLowerCase();
  //       const keysPressed = [...(isMetaKeyPressed ? ['meta'] : []), key];
  //       const shouldTriggerOnCommandPress =
  //         commandKeyCodes?.every((key) => keysPressed.includes(key)) ?? false;

  //       console.log({
  //         shouldTriggerOnCommandPress,
  //         command,
  //         key: e.key,
  //         meta: e.metaKey || e.ctrlKey,
  //       });
  //       if (shouldTriggerOnCommandPress) {
  //         e.preventDefault();
  //         e.stopPropagation();
  //         onCommandPress();
  //       }
  //     };
  //     document.addEventListener('keydown', handleKeyDown);
  //     return () => {
  //       document.removeEventListener('keydown', handleKeyDown);
  //     };
  //   }
  // }, [command, onCommandPress, commandKeyCodes]);

  return (
    <S.ItemContainer>
      <S.IconContainer
        $size={size}
        $sizeConfined={sizeConfined}
        $sizeWide={sizeWide}
      >
        {icon}
      </S.IconContainer>
      <S.Label>{label}</S.Label>
      {command && (
        <S.KBDContainer>
          {command.map((key) => (
            <S.KBD
              key={`${label}-${key}`}
              dangerouslySetInnerHTML={{ __html: key }}
            />
          ))}
        </S.KBDContainer>
      )}
    </S.ItemContainer>
  );
};
