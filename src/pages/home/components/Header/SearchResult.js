import React from 'react';
import { Divider, List, Avatar } from 'antd';
import { DEFAULT_AVATAR } from '@/utils/const';
import styles from './index.less';

const SearchResult = ({ friendResult, groupResult, search }) => (
  <div className={styles.searchResultWrapper}>
    {friendResult.length > 0 && (
      <>
        <div className={styles.title}>好友</div>
        <List
          itemLayout="horizontal"
          dataSource={friendResult}
          renderItem={item => (
            <List.Item style={{ cursor: 'pointer' }}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar || DEFAULT_AVATAR} />}
                title={
                  <>
                    {item.remarkName ? (
                      <>
                        {item.remarkName.split(search).map((t, index, self) =>
                          index + 1 !== self.length ? (
                            <>
                              {t}
                              <span style={{ color: '#1890ff' }}>{search}</span>
                            </>
                          ) : (
                            <>{t}</>
                          ),
                        )}
                        (
                        {item.nickname.split(search).map((t, index, self) =>
                          index + 1 !== self.length ? (
                            <>
                              {t}
                              <span style={{ color: '#1890ff' }}>{search}</span>
                            </>
                          ) : (
                            <>{t}</>
                          ),
                        )}
                        )
                      </>
                    ) : (
                      <>
                        {item.nickname.split(search).map((t, index, self) =>
                          index + 1 !== self.length ? (
                            <>
                              {t}
                              <span style={{ color: '#1890ff' }}>{search}</span>
                            </>
                          ) : (
                            <>{t}</>
                          ),
                        )}
                      </>
                    )}
                  </>
                }
                description={`来自分组: ${item.groupName}`}
              />
            </List.Item>
          )}
        />
      </>
    )}
    {friendResult.length > 0 && groupResult.length > 0 && (
      <Divider style={{ margin: '4px', position: 'relative', left: '-4px' }} />
    )}
    {groupResult.length > 0 && (
      <>
        <div className={styles.title}>群聊</div>
        <List
          itemLayout="horizontal"
          dataSource={groupResult}
          renderItem={item => (
            <List.Item style={{ cursor: 'pointer' }}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar || DEFAULT_AVATAR} />}
                title={
                  <>
                    {item.remarkName ? (
                      <>
                        {item.remarkName.split(search).map((t, index, self) =>
                          index + 1 !== self.length ? (
                            <>
                              {t}
                              <span style={{ color: '#1890ff' }}>{search}</span>
                            </>
                          ) : (
                            <>{t}</>
                          ),
                        )}
                        (
                        {item.nickname.split(search).map((t, index, self) =>
                          index + 1 !== self.length ? (
                            <>
                              {t}
                              <span style={{ color: '#1890ff' }}>{search}</span>
                            </>
                          ) : (
                            <>{t}</>
                          ),
                        )}
                        )
                      </>
                    ) : (
                      <>
                        {item.nickname.split(search).map((t, index, self) =>
                          index + 1 !== self.length ? (
                            <>
                              {t}
                              <span style={{ color: '#1890ff' }}>{search}</span>
                            </>
                          ) : (
                            <>{t}</>
                          ),
                        )}
                      </>
                    )}
                  </>
                }
                description={`来自分组: ${item.groupName}`}
              />
            </List.Item>
          )}
        />
      </>
    )}
  </div>
);

export default SearchResult;
