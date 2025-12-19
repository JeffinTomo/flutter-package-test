import { useState } from 'react';
import { NetworkManager, type Network } from '@tomo/network-manage';
import { WebFListView } from '../../components/webf-listview';
import { WebFRouter } from '../../router';

/**
 * Network Manage 测试页面
 * 用于测试 network_manage 包的功能
 */
export default function NetworkManagePage() {
  const [networks, setNetworks] = useState<Network[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTest, setActiveTest] = useState<string>('');

  // 获取 NetworkManager 实例
  const manager = NetworkManager.getInstance();

  const handleBack = () => {
    WebFRouter.back();
  };

  const handleRefresh = () => {
    console.log('Refreshing network data...');
    // 重新加载当前激活的测试
    if (activeTest === 'all') {
      handleLoadAllNetworks();
    } else if (activeTest === 'evm') {
      handleLoadEvmNetworks();
    } else if (activeTest === 'id3') {
      handleLoadNetworkById3();
    }
  };

  /**
   * 查询所有网络
   */
  const handleLoadAllNetworks = () => {
    try {
      setLoading(true);
      setActiveTest('all');
      const allNetworks = manager.loadNetworks();
      setNetworks(allNetworks);
    } catch (error) {
      console.error('查询失败:', error);
      setNetworks([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 查询所有 EVM 网络
   */
  const handleLoadEvmNetworks = () => {
    try {
      setLoading(true);
      setActiveTest('evm');
      const evmNetworks = manager.loadNetworks('EVM');
      setNetworks(evmNetworks);
    } catch (error) {
      console.error('查询失败:', error);
      setNetworks([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 查询 id=3 的网络
   */
  const handleLoadNetworkById3 = () => {
    try {
      setLoading(true);
      setActiveTest('id3');
      const network = manager.getNetwork(3);
      setNetworks(network ? [network] : []);
    } catch (error) {
      console.error('查询失败:', error);
      setNetworks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      background: '#000000'
    }}>
      {/* Top Navigation Bar */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        gap: '8px',
        width: '100%',
        height: '48px',
        boxSizing: 'border-box',
        flexShrink: 0
      }}>
        {/* Back Button - Left */}
        <div
          onClick={handleBack}
          style={{
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
          className="active:opacity-70 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Title - Center */}
        <span style={{
          fontFamily: 'Sora',
          fontWeight: 600,
          fontSize: '18px',
          lineHeight: '140%',
          display: 'flex',
          alignItems: 'center',
          color: '#D9D9D9'
        }}>
          Network Manage
        </span>

        {/* Placeholder - Right (hidden) */}
        <div style={{
          width: '24px',
          height: '24px',
          visibility: 'hidden',
          flexShrink: 0
        }} />
      </div>

      {/* Content with WebFListView */}
      <WebFListView
        onRefresh={handleRefresh}
        refresh-style="customCupertino"
        style={{
          flex: 1,
          width: '100%',
          height: 'calc(100vh - 48px)'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '24px 20px',
          gap: '20px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Test Buttons Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%'
          }}>
            <span style={{
              fontFamily: 'Sora',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '140%',
              color: '#D9D9D9',
              marginBottom: '4px'
            }}>
              测试查询
            </span>

            {/* Button 1: All Networks */}
            <button
              onClick={handleLoadAllNetworks}
              disabled={loading}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.09)',
                borderRadius: '12px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
                transition: 'opacity 0.2s',
                boxSizing: 'border-box'
              }}
              className="active:opacity-70"
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(71, 205, 137, 0.15)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3V10M10 10V17M10 10H17M10 10H3" stroke="#47CD89" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                  <span style={{
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#D9D9D9'
                  }}>
                    查询所有网络
                  </span>
                  <span style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '140%',
                    color: '#79716B'
                  }}>
                    loadNetworks()
                  </span>
                </div>
              </div>
              {activeTest === 'all' && !loading && (
                <span style={{
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#47CD89'
                }}>
                  ✓
                </span>
              )}
            </button>

            {/* Button 2: EVM Networks */}
            <button
              onClick={handleLoadEvmNetworks}
              disabled={loading}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.09)',
                borderRadius: '12px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
                transition: 'opacity 0.2s',
                boxSizing: 'border-box'
              }}
              className="active:opacity-70"
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(138, 99, 210, 0.15)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2L16 6V14L10 18L4 14V6L10 2Z" stroke="#8A63D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                  <span style={{
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#D9D9D9'
                  }}>
                    查询 EVM 网络
                  </span>
                  <span style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '140%',
                    color: '#79716B'
                  }}>
                    loadNetworks('EVM')
                  </span>
                </div>
              </div>
              {activeTest === 'evm' && !loading && (
                <span style={{
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#47CD89'
                }}>
                  ✓
                </span>
              )}
            </button>

            {/* Button 3: Network by ID */}
            <button
              onClick={handleLoadNetworkById3}
              disabled={loading}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.09)',
                borderRadius: '12px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
                transition: 'opacity 0.2s',
                boxSizing: 'border-box'
              }}
              className="active:opacity-70"
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 173, 50, 0.15)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="6" stroke="#FFAD32" strokeWidth="2" fill="none" />
                    <path d="M10 7V10L12 12" stroke="#FFAD32" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                  <span style={{
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#D9D9D9'
                  }}>
                    查询 Chain ID = 3
                  </span>
                  <span style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '140%',
                    color: '#79716B'
                  }}>
                    getNetwork(3)
                  </span>
                </div>
              </div>
              {activeTest === 'id3' && !loading && (
                <span style={{
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#47CD89'
                }}>
                  ✓
                </span>
              )}
            </button>
          </div>

          {/* Results Section */}
          {networks.length > 0 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%',
              marginTop: '12px'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontFamily: 'Sora',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '140%',
                  color: '#D9D9D9'
                }}>
                  查询结果
                </span>
                <span style={{
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#79716B'
                }}>
                  共 {networks.length} 个
                </span>
              </div>

              {/* Network Items */}
              {networks.map((network) => (
                <NetworkItem key={network.chainId} network={network} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && networks.length === 0 && activeTest && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 20px',
              width: '100%',
              marginTop: '20px'
            }}>
              <span style={{
                fontWeight: 400,
                fontSize: '14px',
                color: '#79716B',
                textAlign: 'center'
              }}>
                未找到网络数据
              </span>
            </div>
          )}

          {/* Initial State */}
          {!activeTest && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              width: '100%',
              marginTop: '20px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="#79716B" strokeWidth="2" fill="none" />
                  <path d="M12 8V12L15 15" stroke="#79716B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span style={{
                fontWeight: 400,
                fontSize: '14px',
                color: '#79716B',
                textAlign: 'center'
              }}>
                选择上方按钮开始测试
              </span>
            </div>
          )}
        </div>
      </WebFListView>
    </div>
  );
}

// Network Item Component
interface NetworkItemProps {
  network: Network;
}

function NetworkItem({ network }: NetworkItemProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      width: '100%',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      boxSizing: 'border-box'
    }}>
      {/* Left side - Icon + Info */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
        flex: 1,
        minWidth: 0
      }}>
        {/* Network Icon */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          overflow: 'hidden',
          flexShrink: 0,
          background: 'rgba(255, 255, 255, 0.09)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {network.icon ? (
            <img
              src={network.icon}
              alt={network.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <span style={{ color: '#79716B', fontSize: '14px' }}>
              {network.nativeCurrencySymbol.charAt(0)}
            </span>
          )}
        </div>

        {/* Network Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '2px',
          flex: 1,
          minWidth: 0
        }}>
          <span style={{
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '140%',
            color: '#D9D9D9',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%'
          }}>
            {network.chainName}
          </span>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '140%',
              color: '#79716B'
            }}>
              {network.platformType}
            </span>
            <span style={{
              color: '#79716B',
              fontSize: '12px'
            }}>
              •
            </span>
            <span style={{
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '140%',
              color: '#79716B'
            }}>
              ID: {network.chainId}
            </span>
          </div>
        </div>
      </div>

      {/* Right side - Symbol Badge */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6px 12px',
        background: 'rgba(71, 205, 137, 0.1)',
        borderRadius: '8px',
        flexShrink: 0
      }}>
        <span style={{
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '140%',
          color: '#47CD89'
        }}>
          {network.nativeCurrencySymbol}
        </span>
      </div>
    </div>
  );
}

